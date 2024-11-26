import user from '../model/userModel.js';
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, '../src/assets/images')
    },
    filename: function (req, file, cd) {
        cd(null, file.originalname);
    }
})

export const upload = multer({ storage });
export const editUser = async (req, res) => {
    try {
        const { findemail } = req.params;
        const { username, email, city, country, state, profilePic, role } = req.body;

        const updateUser = await user.findOneAndUpdate(
            { email: findemail },
            { $set: { username, email, city, country, state, profilePic, role } },
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'user updated successfully' });
    }
    catch (error) {

        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Error updating the profile' });
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const { findemail } = req.params;
        const oneuser = await user.findOne({ email: findemail })

        if (!oneuser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'user get successfully', oneuser });

    } catch (error) {
        res.status(500).json({ message: 'Error geting the profile' });
    }
} 