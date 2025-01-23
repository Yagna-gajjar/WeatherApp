import user from '../model/userModel.js';

export const editUser = async (req, res) => {
    try {
        const { findemail } = req.params;
        const { username, city, country, state, profilePic } = req.body;
        console.log(profilePic);
        const updateUser = await user.findOneAndUpdate(
            { email: findemail },
            { $set: { username, city, country, state, profilePic } },
            { new: true }
        )

        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(updateUser);

        res.status(200).json({ message: 'user updated successfully', updateUser });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Error updating the profile' });
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const { findemail } = req.params;
        const oneuser = await user.findOne({ email: findemail }).populate({
            path: 'cityId',
            populate: [
                { path: 'stateID', model: 'State', select: 'stateName' },
                { path: 'countryID', model: 'Country', select: 'countryName' }
            ]
        });

        if (!oneuser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'user get successfully', oneuser });

    } catch (error) {
        res.status(500).json({ message: 'Error geting the profile' });
    }
} 