const {OpenAI} = require("openai");

const OpenAI_Api =  process.env.OPENAI_API_KEY || "Mykey"

const openai = new OpenAI({
    apikey: OpenAI_Api
})


const getAIResponse = async(req, res) => {
    try {
        const {userMessage} = req.body;
        if(!userMessage){
            return res.status(400).json({message: "User message is required"})
        }
        // Get AI response from OpenAI
        const completion = await openai.chat.completions.create({
           model: "gpt-3.5-turbo",
           messages:[{role: "user", content: userMessage}],
        });

        const aiMessage = completion.data.choices[0].message.content;
        res.status(200).json({message: aiMessage});
    } catch (error) {
        console.error("Error fetching AI response:", error)
        res.status(500).json({message: "Failed to get AI response"})
    }
}


module.exports = getAIResponse