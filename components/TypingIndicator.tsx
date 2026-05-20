const TypingIndicator = () => {
  return (
    <div className="flex space-x-1.5 p-4 bg-[#080808] border border-white/10 rounded-2xl rounded-tl-none w-16 items-center justify-center shadow-sm">
      <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
    </div>
  );
};

export default TypingIndicator;
