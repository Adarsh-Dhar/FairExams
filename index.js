const crypto = require('crypto');

const PROBLEM_STATEMENT = 'What is 2 + 2?';

const key = crypto.randomBytes(32); // IIT BOMBAY SECRET 223
const iv = crypto.randomBytes(16);

function encrypt(text, key, iv) {
    const algorithm = 'aes-256-cbc';

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex'); // 0123456789ABCDEF
    encrypted += cipher.final('hex');   
    return encrypted; 
}

function decrypt(encrypted, key, iv) {
    const algorithm = 'aes-256-cbc';
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


const encryptedProblem = encrypt(PROBLEM_STATEMENT, key, iv);
console.log('Encrypted Problem:', encryptedProblem);

const decryptedProblem = decrypt(encryptedProblem, key, iv);
console.log('Decrypted Problem:', decryptedProblem);