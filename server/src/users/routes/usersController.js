const express = require('express');
const router = express.Router();
const auth = require('../../auth/authService');
const { handleError } = require('../../utlis/errorHandler');
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  changeUserBusinessStatus,
  deleteUser
} = require('../services/userService');
router.post('/', async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

router.post('/login' ,async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error.status || 500, error.message); 
  }
});

router.get('/', auth, async (req, res) => {
  try {
   
    if (!req.user.isAdmin) {
      return handleError(res, 403,
        "Authorization Error: Only admin users can view all users"
      );
    }

    const users = await getUsers();
    res.json(users);
  } catch (error) {
    return handleError(res, 500, error.message);
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const isOwnProfile = req.user.id === req.params.id;
    const isAdmin = req.user.isAdmin;

    if (!isOwnProfile && !isAdmin) {
      return handleError(res, 403,
        "Authorization Error: You can only view your own profile"
      );
    }

    const user = await getUser(req.params.id);
    res.json(user);
  } catch (error) {
    return handleError(res, 404, error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return handleError(res, 403,
        "Authorization Error: You can only update your own profile"
      );
    }

    const updatedUser = await updateUser(req.params.id, req.body);
    res.json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
   
    if (!req.user.isAdmin || req.user.id !== req.params.id) {
      return handleError(res, 403,
        "Authorization Error: Only admin users can change business status or if you want to change your own status"
      );
    }

    const user = await changeUserBusinessStatus(req.params.id);
    res.json({
      message: "Business status changed successfully",
      status: 200,
      user: user
    });
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const isOwnProfile = req.user.id === req.params.id;
    const isAdmin = req.user.isAdmin;

    if (!isOwnProfile && !isAdmin) {
      return handleError(res, 403,
        "Authorization Error: You can only delete your own account"
      );
    }

    await deleteUser(req.params.id);
    res.json({
      message: "User deleted successfully",
      userId: req.params.id
    });
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

module.exports = router;