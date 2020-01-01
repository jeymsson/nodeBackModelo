import User from '../models/User';

class UserController {
    async store(req, res) {
        const emailExists = await User.findOne({
            where: { email: req.body.email },
        });
        const userExists = await User.findOne({
            where: { name: req.body.name },
        });
        if (emailExists || userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }
        const pars = req.body;
        const { id, name, email, provider } = await User.create(pars);
        return res.json({
            created: {
                id,
                name,
                email,
                provider,
            },
        });
    }
}
export default new UserController();
