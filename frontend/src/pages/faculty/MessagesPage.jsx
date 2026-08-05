import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const FacultyMessagesPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await api.get('/messages');
      setMessages(res.data.data || []);
    } catch (e) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSendReply = async (msg) => {
    if (!replyContent.trim()) {
      toast.error('Please write a reply message');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/messages', {
        receiver_id: msg.sender_id,
        subject: `Re: ${msg.subject.replace(/^Re:\s*/i, '')}`,
        content: replyContent
      });
      toast.success(`Reply sent to ${msg.sender?.username || 'Student'}`);
      setReplyContent('');
      setReplyingTo(null);
      fetchMessages();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to send reply');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-4xl">
      <div className="page-header">
        <div>
          <h1 className="page-title">Student Inquiries & Messages</h1>
          <p className="page-subtitle">Questions and assignment inquiries submitted by students in your courses</p>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-campus-navy-900 mb-4 flex items-center gap-2">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-campus-gold-600" /> Student Queries & Message Log
        </h3>

        {loading ? (
          <div className="shimmer h-32 rounded-xl"></div>
        ) : messages.length === 0 ? (
          <p className="text-xs text-slate-400 py-8 text-center">No student inquiries received yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => {
              const isSender = m.sender_id === user?.id;
              const dateStr = new Date(m.createdAt || m.created_at).toLocaleString();
              const isReplyingThis = replyingTo === m.message_id;

              return (
                <div key={m.message_id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {isSender ? (
                        <>
                          <span className="font-bold text-campus-navy-600">To Student: {m.receiver?.username || 'Student'} ({m.receiver?.email})</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-700 font-semibold">Sent</span>
                        </>
                      ) : (
                        <>
                          <span className="font-bold text-campus-gold-600">From Student: {m.sender?.username || 'Student'} ({m.sender?.email})</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-700 font-semibold">Received</span>
                        </>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{dateStr}</span>
                  </div>

                  <h4 className="font-bold text-campus-navy-900 text-base">{m.subject}</h4>
                  <p className="text-xs text-slate-500 bg-slate-950/60 p-3 rounded-lg leading-relaxed">{m.content}</p>

                  {!isSender && (
                    <div className="pt-1">
                      {isReplyingThis ? (
                        <div className="space-y-3 mt-2 p-3 bg-white border border-slate-200 rounded-lg">
                          <textarea
                            className="form-input text-xs"
                            rows="3"
                            placeholder={`Write reply to ${m.sender?.username || 'Student'}...`}
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => { setReplyingTo(null); setReplyContent(''); }}
                              className="px-3 py-1 text-xs text-slate-600 hover:text-slate-800"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              disabled={submitting}
                              onClick={() => handleSendReply(m)}
                              className="btn-primary text-xs py-1 px-3 flex items-center gap-1"
                            >
                              <PaperAirplaneIcon className="w-3.5 h-3.5" /> Send Reply
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => { setReplyingTo(m.message_id); setReplyContent(''); }}
                          className="text-xs font-semibold text-campus-navy-600 hover:text-campus-navy-800 flex items-center gap-1"
                        >
                          <PaperAirplaneIcon className="w-3.5 h-3.5 text-campus-gold-600" /> Reply to Student
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FacultyMessagesPage;
