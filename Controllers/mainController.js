exports.createResponse = async (req, res) => {
    console.log("start response...");
    console.log(req.body);
    const { text } = req.body;
  
    if (text === "") {
      return res.status(200).json({ message: "Incomplete text inputted", success: false });
    }
  
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const dotenv = require("dotenv");
      //const readline = require("readline");
  
      dotenv.config();
      const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  
    //   const userInterface = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    //   });
  
      //userInterface.prompt();
  
      
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
        try {
          const result = await model.generateContentStream(text);
  
          let responseText = '';
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            responseText += chunkText;
          }
  
          // Handle response here or store it in a variable for later use
          console.log("Generated response:", responseText);
        } catch (error) {
          console.error("Error generating content:", error);
        } 
      
    } catch (error) {
      console.error("Error initializing GoogleGenerativeAI:", error);
      return res.status(500).json({ message: "Internal server error", success: false });
    }
  
    // You might want to return a response indicating that the generation process has started
    return res.status(200).json({ message: "Text generation process started", success: true });
  };
  