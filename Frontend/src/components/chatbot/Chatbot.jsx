import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatIcon from "../../assets/icons/ChatIcon";
import { SendFill, X } from "react-bootstrap-icons";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [conversation, isOpen]);

  const handleQuestionSubmit = async () => {
    try {
      setLoading(true);

      const newQuestion = { question: input };

      const response = await fetch("http://localhost:3001/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      if (response.ok) {
        const data = await response.json();
        newQuestion.answer = data.answer;
        setConversation([...conversation, newQuestion]);
        setInput("");
      } else {
        console.error("Failed to submit question:", response.statusText);
      }
    } catch (error) {
      console.error("Error processing question:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "15px",
          right: "15px",
          zIndex: 5000,
        }}
      >
        <ChatIcon />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
            transition={{ duration: 0.5 }}
            className="container position-fixed p-3 border border-dark shadow-lg rounded-4 bg-blue chat-container"
            style={{
              maxWidth: "400px",
              height: "700px",
              overflow: "hidden",
              zIndex: 5050,
              right: "10px",
              bottom: "15px",
            }}
          >
            <div className="chat-header d-flex justify-content-between align-items-center">
              <p className="p-0 m-0 mt-2 fs-4"> Assistant Bot</p>

              <X className="fs-3 cursor-pointer custom-icon" onClick={() => setIsOpen(false)} aria-label="Close chat" />
            </div>
            <div className="chat-messages pb-4" style={{ overflowY: "auto" }}>
              {conversation.map((pair, index) => (
                <React.Fragment key={index}>
                  <div className="d-flex justify-content-end">
                    <div className="p-2 my-3 bg-secondary-color" style={{ borderRadius: "10px", maxWidth: "70%" }}>
                      {pair.question}
                    </div>
                  </div>
                  <pre className="bg-background-color p-2 rounded-3">{pair.answer}</pre>
                </React.Fragment>
              ))}
              {loading && (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input bg-blue py-4 px-4 ">
              <div className="input-group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleQuestionSubmit()}
                  className="form-control"
                  placeholder="Fammi una domanda..."
                />
                <div className="input-group-append">
                  <button
                    onClick={handleQuestionSubmit}
                    type="button"
                    disabled={loading}
                    className="rounded-2 rounded-start-0 btn btn-custom py-2"
                  >
                    <SendFill />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
