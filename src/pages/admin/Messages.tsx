import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { API_URL, authenticatedFetch } from "@/lib/api";
import { MailOpen, Trash2, Reply, Send, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const fetchMessages = async () => {
  const response = await authenticatedFetch(`${API_URL}/api/admin/messages`);
  if (!response.ok) throw new Error("Failed to fetch messages");
  return response.json();
};

const markAsRead = async (id: number) => {
  const response = await authenticatedFetch(`${API_URL}/api/admin/messages/${id}/read`, {
    method: "PUT",
  });
  if (!response.ok) throw new Error("Failed to mark as read");
  return response.json();
};

const deleteMessage = async (id: number) => {
  const response = await authenticatedFetch(`${API_URL}/api/admin/messages/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete message");
  return response.json();
};

const Messages = () => {
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  // Reply compose modal state
  const [replyingMessage, setReplyingMessage] = useState<any | null>(null);
  const [replySubject, setReplySubject] = useState("");
  const [replyBody, setReplyBody] = useState("");

  // Delete confirmation state
  const [deletingMessageId, setDeletingMessageId] = useState<number | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["adminMessages"],
    queryFn: fetchMessages,
  });

  const readMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminMessages"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      toast.success("Message marked as read");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminMessages"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      toast.success("Message deleted");
      setDeletingMessageId(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete message");
    }
  });

  const replyMutation = useMutation({
    mutationFn: async ({ id, subject, message }: { id: number; subject: string; message: string }) => {
      const response = await authenticatedFetch(`${API_URL}/api/admin/messages/${id}/reply`, {
        method: "POST",
        body: JSON.stringify({ subject, message }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send reply");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminMessages"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      toast.success("Reply email sent successfully");
      setReplyingMessage(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to send reply");
    }
  });

  const handleOpenReply = (msg: any) => {
    setReplyingMessage(msg);
    setReplySubject(`Re: ${msg.subject}`);
    setReplyBody("");
  };

  if (isLoading) return <div className="flex items-center justify-center h-full">Loading messages...</div>;
  if (error || !data?.success) return <div className="text-red-500">Failed to load messages.</div>;

  const messages = data.data;

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Contact Form Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No messages found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[150px]">Date</TableHead>
                    <TableHead className="w-[180px]">Name</TableHead>
                    <TableHead className="w-[220px]">Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-right w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((msg: any) => (
                    <React.Fragment key={msg.id}>
                      <TableRow 
                        className={`cursor-pointer transition-colors hover:bg-muted/40 ${
                          msg.status === "unread" ? "bg-sky-50/20 font-medium" : ""
                        } ${expandedId === msg.id ? "bg-muted/30" : ""}`}
                        onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          {msg.status === "unread" ? (
                            <Badge variant="default" className="bg-sky-500 hover:bg-sky-600">New</Badge>
                          ) : (
                            <Badge variant="secondary">Read</Badge>
                          )}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(msg.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="truncate max-w-[150px]" title={msg.name}>
                          {msg.name}
                        </TableCell>
                        <TableCell className="truncate max-w-[180px]" title={msg.email}>
                          {msg.email}
                        </TableCell>
                        <TableCell className="max-w-[250px] truncate" title={msg.subject}>
                          <div className="flex items-center gap-2">
                            {expandedId === msg.id ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                            )}
                            <span className="truncate">{msg.subject}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenReply(msg)}
                            title="Reply"
                            className="text-sky-500 hover:text-sky-700 hover:bg-sky-50"
                          >
                            <Reply className="h-4 w-4" />
                          </Button>
                          {msg.status === "unread" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => readMutation.mutate(msg.id)}
                              title="Mark as read"
                              className="text-sky-500 hover:text-sky-700 hover:bg-sky-50"
                            >
                              <MailOpen className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeletingMessageId(msg.id)}
                            title="Delete"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      
                      {expandedId === msg.id && (
                        <TableRow className="bg-muted/10 hover:bg-muted/10">
                          <TableCell colSpan={6} className="p-4 border-t border-b bg-slate-50/50">
                            <div className="space-y-4 pl-6 pr-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">From</span>
                                  <span className="text-sm font-semibold text-slate-700">{msg.name} ({msg.email})</span>
                                </div>
                                {msg.company && (
                                  <div>
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Company</span>
                                    <span className="text-sm font-semibold text-slate-700">{msg.company}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div>
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Message Content</span>
                                <div className="text-sm mt-1.5 p-4 bg-background border border-slate-100 rounded-lg whitespace-pre-wrap text-slate-800 shadow-inner max-w-4xl">
                                  {msg.message}
                                </div>
                              </div>
                              
                              <div className="flex gap-3 pt-2">
                                <Button
                                  size="sm"
                                  className="bg-sky-500 hover:bg-sky-600 text-white font-medium shadow-sm flex items-center gap-1.5"
                                  onClick={() => handleOpenReply(msg)}
                                >
                                  <Reply className="h-3.5 w-3.5" /> Reply
                                </Button>
                                {msg.status === "unread" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-slate-200 hover:bg-slate-100 flex items-center gap-1.5"
                                    onClick={() => readMutation.mutate(msg.id)}
                                  >
                                    <MailOpen className="h-3.5 w-3.5 text-slate-500" /> Mark as Read
                                  </Button>
                                )}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gmail-style Centered Compose Modal */}
      <Dialog open={!!replyingMessage} onOpenChange={(open) => !open && setReplyingMessage(null)}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border border-slate-200 shadow-2xl rounded-xl">
          <DialogHeader className="bg-slate-900 text-white p-4 flex flex-row items-center justify-between">
            <DialogTitle className="text-sm font-semibold flex items-center gap-2">
              <Reply className="h-4 w-4 text-sky-400" />
              Reply to {replyingMessage?.name}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (!replyBody.trim()) {
              toast.error("Reply message body cannot be empty");
              return;
            }
            replyMutation.mutate({
              id: replyingMessage.id,
              subject: replySubject,
              message: replyBody
            });
          }} className="p-5 space-y-4 bg-background">
            {/* Recipient email */}
            <div className="space-y-1.5">
              <Label htmlFor="recipient" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                To
              </Label>
              <Input
                id="recipient"
                value={replyingMessage?.email || ""}
                disabled
                readOnly
                className="bg-muted border-slate-200 text-muted-foreground cursor-not-allowed select-all h-10 font-medium"
              />
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <Label htmlFor="subject" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Subject
              </Label>
              <Input
                id="subject"
                value={replySubject}
                onChange={(e) => setReplySubject(e.target.value)}
                placeholder="Subject"
                required
                className="border-slate-200 focus-visible:ring-sky-500 h-10"
              />
            </div>

            {/* Original inquiry context */}
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 max-h-[100px] overflow-y-auto text-xs text-slate-500">
              <div className="font-semibold text-slate-600 mb-1">
                Original Message ({replyingMessage ? format(new Date(replyingMessage.createdAt), "MMM d, h:mm a") : ""}):
              </div>
              <div className="whitespace-pre-wrap italic">
                "{replyingMessage?.message}"
              </div>
            </div>

            {/* Reply Body */}
            <div className="space-y-1.5">
              <Label htmlFor="body" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Message
              </Label>
              <Textarea
                id="body"
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
                placeholder="Type your reply here..."
                rows={8}
                required
                className="resize-none border-slate-200 focus-visible:ring-sky-500 min-h-[160px] p-3 text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setReplyingMessage(null)}
                className="hover:bg-slate-100 font-medium"
                disabled={replyMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white font-medium min-w-[90px] flex items-center justify-center gap-1.5 shadow-sm"
                disabled={replyMutation.isPending}
              >
                {replyMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deletingMessageId !== null} onOpenChange={(open) => !open && setDeletingMessageId(null)}>
        <DialogContent className="sm:max-w-[400px] p-6 border border-slate-200 shadow-2xl rounded-xl">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 animate-pulse">
              <Trash2 className="h-6 w-6" />
            </div>
            
            <div className="space-y-1.5">
              <DialogTitle className="text-lg font-bold text-slate-900">
                Delete Message?
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this message? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 w-full pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDeletingMessageId(null)}
                className="hover:bg-slate-100 font-medium w-full"
                disabled={deleteMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  if (deletingMessageId !== null) {
                    deleteMutation.mutate(deletingMessageId);
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-medium w-full flex items-center justify-center gap-1.5 shadow-sm"
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Messages;
