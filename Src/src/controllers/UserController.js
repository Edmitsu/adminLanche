const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {
    home: (req, res) => {
        res.status(200).json({ msg: 'Usuários Cadastrados' });
    },

    userLogged: async (req, res) => {
        const id = req.params.id;

        // Verificar se o usuário existe
        const user = await User.findById(id, '-password');

        if (!user) {
            res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        res.status(200).json({ user });
    },

    userRegister: async (req, res) => {
        const { name, email, password, confirmPassword } = req.body;

        if (!name) {
            return res.status(422).json({ msg: 'O nome é obrigatório' });
        }

        if (!email) {
            return res.status(422).json({ msg: 'O email é obrigatório' });
        }

        if (!password) {
            return res.status(422).json({ msg: 'A senha é obrigatória' });
        }

        if (password !== confirmPassword) {
            return res.status(422).json({ msg: 'As senhas não conferem!' });
        }

        // Verificar se o usuário já existe
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ msg: 'Email já cadastrado!' });
        }

        // Criar a senha com hash
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Criar o usuário
        const user = new User({
            name,
            email,
            password: passwordHash,
        });

        try {
            await user.save();

            res.status(201).json({ msg: 'Usuário criado com sucesso!' });
        } catch (error) {
            console.log(error);

            res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente novamente mais tarde.' });
        }
    },

    userLogin: async (req, res) => {
        const { email, password } = req.body;

        if (!email) {
            return res.status(422).json({ msg: 'O email é obrigatório' });
        }

        if (!password) {
            return res.status(422).json({ msg: 'A senha é obrigatória' });
        }

        // Verificar se o usuário existe
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        // Verificar se a senha corresponde
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({ msg: 'Senha inválida!' });
        }

        try {
            const secret = "8f9cf2b3-5747-4b60-a771-145d6d1eef00"; 

            const expiresIn = "15m"; // Tempo da sessão (15 minutos)

            const token = jwt.sign(
                {
                    id: user._id,
                },
                secret,
                {
                    expiresIn,
                }
            );

            res.status(200).json({ msg: 'Autenticação realizada com sucesso', token });

        } catch (error) {
            console.log(error);

            res.status(500).json({ msg: 'Ocorreu um erro no servidor, tente novamente mais tarde.' });
        }
    }
    
};

module.exports = UserController;
