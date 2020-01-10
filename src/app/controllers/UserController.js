import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        // Start validation
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }
        // End validation

        const param = req.body;
        if (!param.email || !param.name) {
            return res.status(400).json({ error: 'Parameters not found.' });
        }
        const emailExists = await User.findOne({
            where: { email: param.email },
        });
        const userExists = await User.findOne({
            where: { name: param.name },
        });
        if (emailExists || userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }
        const { id, name, email, provider } = await User.create(param);
        return res.json({
            created: {
                id,
                name,
                email,
                provider,
            },
        });
    }

    async update(req, res) {
        // Start validation
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            oldPassword: Yup.string()
                .required()
                .min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            confirmPassword: Yup.string()
                .min(6)
                .when('password', (password, field) =>
                    password
                        ? field.required().oneOf([Yup.ref('password')])
                        : field
                ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails.' });
        }
        // End validation

        const param = req.body;
        if (!param.id || !param.email || !param.name) {
            return res.status(400).json({ error: 'Parameters not found.' });
        }

        const user = await User.findByPk(param.id);
        if (!user) {
            return res.status(400).json({ error: 'User not exists.' });
        }
        if (param.email !== user.email) {
            return res.status(400).json({ error: 'Email incorrect.' });
        }
        const { id, name, email, provider } = await user.update(param);

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }

    async list(req, res) {
        return res.json({ User: User.findAll() });
    }
}
export default new UserController();
