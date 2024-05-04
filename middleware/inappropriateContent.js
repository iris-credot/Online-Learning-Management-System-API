const badWords = [  'profanity','obscenity','vulgar','offensive','xplicit','porn','sex','xxx','nude','pornography','sexual','hate','speech','racist','bigotry','discrimination','violence','threat','abuse','harassment','bullying','drug','alcohol','illegal','fraud','scam','phishing','spam','malware','virus','infection','pharma','gambling','casino','betting','cheat','plagiarism','copy','steal','piracy','torrent','warez','crack','hack','exploit']; 

const badWordFilterMiddleware = (req, res, next) => {
    const { content } = req.body; // Assuming content is the field that contains the submission content

    // Check if the content contains any bad words
    const containsBadWord = badWords.some(word => content.toLowerCase().includes(word.toLowerCase()));

    if (containsBadWord) {
        return res.status(400).json({ message: 'Submission contains inappropriate content.' });
    }

    // If no bad words are found, proceed to the next middleware or route handler
    next();
};
module.exports=badWordFilterMiddleware