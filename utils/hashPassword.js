import bcrypt from 'bcrypt';

async function generateHash() {
    const password = 'admin123';
    const saltRounds = 10;
    
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log('Password:', password);
        console.log('Hash generado:', hash);
        
        // Verificar que funciona
        const isValid = await bcrypt.compare(password, hash);
        console.log('Verificación:', isValid ? '✅ Correcto' : '❌ Error');
        
        console.log('\n--- SQL para actualizar ---');
        console.log(`UPDATE usuarios SET password = '${hash}' WHERE email = 'admin@beautysmile.com';`);
        console.log(`UPDATE usuarios SET password = '${hash}' WHERE email = 'doctor@beautysmile.com';`);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

generateHash();