// MGR University Interactive Javascript

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------
    // CHATBOT HELPDESK IMPLEMENTATION
    // -----------------------------------------------------
    
    // Inject Chat HTML into body
    const chatHTML = `
        <div class="chat-widget" id="mgrChatWidget" style="position: fixed; bottom: 30px; right: 30px; z-index: 1000; font-family: 'Inter', sans-serif;">
            <button class="chat-trigger" style="width: 60px; height: 60px; border-radius: 50%; background: var(--secondary); color: var(--primary-dark); border: none; box-shadow: var(--shadow-lg); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 24px; transition: transform 0.3s;">
                <i class="fas fa-comment-dots"></i>
            </button>
            
            <div class="chat-window" style="display: none; position: absolute; bottom: 75px; right: 0; width: 340px; background: var(--bg-white); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); overflow: hidden; border: 1px solid var(--border);">
                <div class="chat-header" style="background: var(--primary-dark); color: var(--bg-white); padding: 16px; display: flex; justify-content: space-between; align-items: center;">
                    <h4 style="margin: 0; font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-headset" style="color: var(--secondary);"></i> MGR Helpdesk
                    </h4>
                    <button class="chat-close" style="background: none; border: none; color: var(--bg-white); font-size: 20px; cursor: pointer;">&times;</button>
                </div>
                
                <div class="chat-body" style="height: 320px; overflow-y: auto; padding: 16px; background: #F8FAFC; display: flex; flex-direction: column; gap: 12px;">
                    <div class="chat-msg bot" style="background: var(--bg-white); color: var(--text-dark); padding: 12px 16px; border-radius: 12px; border-bottom-left-radius: 2px; font-size: 13.5px; box-shadow: var(--shadow-sm); border: 1px solid var(--border);">
                        Hello! Welcome to The Tamil Nadu Dr.M.G.R. Medical University portal. Ask me anything about our medical faculties, fees, eligibility, or online application details!
                    </div>
                </div>
                
                <div class="chat-footer" style="padding: 12px; border-top: 1px solid var(--border); display: flex; gap: 8px; background: var(--bg-white);">
                    <input type="text" class="chat-input" placeholder="Type your query here..." style="flex: 1; padding: 10px 14px; border: 1px solid var(--border); border-radius: 20px; font-size: 13px; outline: none;">
                    <button class="chat-send" style="background: var(--primary); color: var(--bg-white); border: none; width: 38px; height: 38px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);
    
    // Chat Interactions
    const trigger = document.querySelector('.chat-trigger');
    const window = document.querySelector('.chat-window');
    const closeBtn = document.querySelector('.chat-close');
    const tooltip = document.querySelector('.chat-tooltip');
    const input = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.chat-send');
    const chatBody = document.querySelector('.chat-body');
    
    const toggleChat = () => {
        const isVisible = window.style.display === 'block';
        window.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) tooltip.style.display = 'none';
        if (isVisible) input.focus();
    };
    
    trigger.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
    
    // Message Handling
    const appendMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = `chat-msg ${sender}`;
        
        // Styles based on sender
        if (sender === 'user') {
            div.style.background = 'var(--primary)';
            div.style.color = 'var(--bg-white)';
            div.style.alignSelf = 'flex-end';
            div.style.borderBottomRightRadius = '2px';
        } else {
            div.style.background = 'var(--bg-white)';
            div.style.color = 'var(--text-dark)';
            div.style.alignSelf = 'flex-start';
            div.style.borderBottomLeftRadius = '2px';
            div.style.border = '1px solid var(--border)';
        }
        
        div.style.padding = '12px 16px';
        div.style.borderRadius = '12px';
        div.style.fontSize = '13.5px';
        div.style.maxWidth = '85%';
        div.style.boxShadow = 'var(--shadow-sm)';
        div.textContent = text;
        
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    };
    
    const processQuery = (query) => {
        appendMessage(query, 'user');
        input.value = '';
        
        let reply = "I'm not sure about that. Please ask about 'admission', 'courses', 'fees', or 'counseling', or contact our registrar directly!";
        const text = query.toLowerCase();
        
        if (text.includes('admission') || text.includes('apply') || text.includes('register')) {
            reply = "To apply for admissions 2026-27 for Medical, Dental, or AYUSH streams, please go to the Signup page by clicking 'Apply Now'.";
        } else if (text.includes('course') || text.includes('program') || text.includes('faculty') || text.includes('mbbs') || text.includes('medicine') || text.includes('bds')) {
            reply = "The Tamil Nadu Dr.M.G.R. Medical University offers premier programs including MBBS, BDS, B.Sc Nursing, B.Pharm, and comprehensive AYUSH programs.";
        } else if (text.includes('fee') || text.includes('cost') || text.includes('payment')) {
            reply = "Fee structures vary by affiliated college and program. Once you register and log into the student portal, you can view the complete fee cycles.";
        } else if (text.includes('tnmgrmu') || text.includes('contact') || text.includes('consent') || text.includes('dnc')) {
            reply = "By submitting your registration, you authorize The Tamil Nadu Dr.M.G.R. Medical University and its partners to contact you via SMS, Email, or Call regarding admissions.";
        } else if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            reply = "Hello! Welcome to The Tamil Nadu Dr.M.G.R. Medical University. How can I assist you with your admissions journey?";
        }
        
        setTimeout(() => appendMessage(reply, 'bot'), 700);
    };
    
    sendBtn.addEventListener('click', () => {
        if (input.value.trim()) processQuery(input.value.trim());
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            processQuery(input.value.trim());
        }
    });

});
