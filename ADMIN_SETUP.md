# 🔐 Admin Setup Guide

## Creating an Admin User

Since the Admin Panel is now restricted to admin users only, you need to create an admin account.

### Method 1: Direct Database Update (Recommended)

After registering a normal user, you can promote them to admin using MongoDB:

#### Using MongoDB Compass (GUI):
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select database: `anime_tracker`
4. Select collection: `users`
5. Find your user document
6. Click "Edit Document"
7. Change `"role": "user"` to `"role": "admin"`
8. Click "Update"
9. Logout and login again in the app

#### Using MongoDB Shell (Command Line):
```bash
# Open MongoDB shell
mongosh

# Switch to anime_tracker database
use anime_tracker

# Update user to admin (replace with your email)
db.users.updateOne(
  { email: "your.email@example.com" },
  { $set: { role: "admin" } }
)

# Verify the change
db.users.findOne({ email: "your.email@example.com" })
```

### Method 2: Register First User as Admin

Modify the registration endpoint temporarily:

1. Open `server/routes/auth.js`
2. Find the user creation code in the `/register` route
3. Temporarily add `role: 'admin'` to the first user:

```javascript
// Create user
const user = await User.create({
  username,
  email,
  password,
  firstName: firstName || '',
  lastName: lastName || '',
  role: 'admin'  // Add this line temporarily
});
```

4. Register your admin account
5. Remove the `role: 'admin'` line (revert to default 'user')
6. Restart the backend server

### Method 3: Using API Endpoint (If Already Admin)

If you already have an admin account, you can promote other users:

```javascript
// Make API call to promote user
fetch('http://localhost:5000/api/admin/users/USER_ID/role', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ADMIN_TOKEN'
  },
  body: JSON.stringify({ role: 'admin' })
})
```

## Admin Panel Features

Once logged in as admin, you will see:

✅ **Admin Link in Navigation** (⚙️ Admin)
✅ **System-wide Statistics**:
   - Total users registered
   - Total shows tracked
   - Total clubs created
   - Active users count
   - New users (last 30 days)

✅ **User Management**:
   - View all registered users
   - Change user roles (user ↔ admin)
   - See user registration dates

✅ **Popular Content**:
   - Most tracked anime shows
   - Recent user registrations

## Testing Admin Access

### 1. Create Test Admin Account
```bash
# Register normally
Email: admin@test.com
Password: admin123

# Then promote via MongoDB
mongosh
use anime_tracker
db.users.updateOne(
  { email: "admin@test.com" },
  { $set: { role: "admin" } }
)
```

### 2. Login as Admin
- Email: admin@test.com
- Password: admin123
- You should now see "⚙️ Admin" in the navigation

### 3. Create Regular User
```bash
Email: user@test.com
Password: user123
Role: user (default)
```

### 4. Verify Access Control
- Login as regular user → Admin link NOT visible
- Try to access `/admin` → Redirected to home
- Login as admin → Admin link visible
- Access `/admin` → Full access granted

## Security Notes

🔒 **Important Security Practices:**

1. **Change Default Credentials**: Never use simple passwords in production
2. **Limit Admin Accounts**: Only trusted users should have admin role
3. **Monitor Admin Actions**: Keep track of who has admin access
4. **Use Strong Passwords**: Minimum 12 characters with mixed case, numbers, symbols
5. **Regular Audits**: Periodically review admin user list

## Admin API Endpoints

### Get System Statistics
```
GET /api/admin/stats
Headers: Authorization: Bearer {admin_token}
```

### Get All Users
```
GET /api/admin/users
Headers: Authorization: Bearer {admin_token}
```

### Update User Role
```
PUT /api/admin/users/:userId/role
Headers: Authorization: Bearer {admin_token}
Body: { "role": "admin" }  // or "user"
```

## Troubleshooting

### "Access denied. Admin privileges required"
- Check if your user role is set to "admin" in database
- Logout and login again to refresh token
- Verify token includes role information

### Admin link not showing
- Check `user?.role` in localStorage
- Clear browser cache and login again
- Verify backend is returning role in login response

### Can't update user role
- Make sure you're logged in as admin
- Check MongoDB connection
- Verify user ID is correct

## User Roles

### `user` (Default)
- ✅ View own watchlist
- ✅ Add/edit/delete own shows
- ✅ Join clubs
- ✅ Create polls
- ✅ Rate shows
- ❌ Cannot access Admin Panel
- ❌ Cannot view system statistics
- ❌ Cannot manage other users

### `admin`
- ✅ All user permissions
- ✅ Access Admin Panel
- ✅ View system statistics
- ✅ View all users
- ✅ Manage user roles
- ✅ See popular content
- ✅ Monitor platform activity

---

**Need Help?** The admin functionality is now fully implemented with proper role-based access control! 🎉
