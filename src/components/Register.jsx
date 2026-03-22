import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', username: '', mail: '', password: '' });
    const [isRegistered, setIsRegistered] = useState(false); // Track success for popup
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://kdev-todo-api.onrender.com/api/todo/auth/register', formData);
            setIsRegistered(true); // Show the popup instead of an alert
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert("Registration failed.");
        }
    };

    return (
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            height: '100vh', backgroundColor: '#121212', color: '#ffffff', fontFamily: 'Arial, sans-serif' 
        }}>
            
            {/* --- REGISTRATION MODAL POPUP --- */}
            {isRegistered && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', zIndex: 100
                }}>
                    <div style={{
                        backgroundColor: '#1e1e1e', padding: '40px', borderRadius: '12px',
                        textAlign: 'center', border: '1px solid #3d5afe', boxShadow: '0 0 20px rgba(61, 90, 254, 0.3)'
                    }}>
                        <div style={{ fontSize: '50px', color: '#3d5afe', marginBottom: '10px' }}>✔</div>
                        <h2 style={{ margin: '0 0 10px' }}>Registered Successfully!</h2>
                        <p style={{ color: '#aaa', marginBottom: '20px' }}>Your account is ready. Please log in to continue.</p>
                        <button 
                            onClick={() => navigate("/")}
                            style={{ 
                                padding: '10px 30px', backgroundColor: '#3d5afe', color: 'white', 
                                border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' 
                            }}
                        >
                            Proceed to Login
                        </button>
                    </div>
                </div>
            )}

            {/* --- MAIN PAGE CONTENT --- */}
            <div style={{ 
                display: 'flex', alignItems: 'center', gap: '50px', padding: '40px', 
                backgroundColor: '#1e1e1e', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' 
            }}>
                
                {/* Left Section: Logo & Title */}
                <div style={{ textAlign: 'center', borderRight: '1px solid #333', paddingRight: '50px' }}>
                    <div style={{ 
                        width: '80px', height: '80px', backgroundColor: '#333', 
                        borderRadius: '20px', margin: '0 auto 15px', display: 'flex', 
                        justifyContent: 'center', alignItems: 'center', fontSize: '40px' 
                    }}>
                        ✓
                    </div>
                    <h1 style={{ margin: 0, fontSize: '28px', letterSpacing: '1px' }}>TaskMaster</h1>
                    <p style={{ color: '#aaa', fontSize: '14px', marginTop: '5px' }}>Join the community.</p>
                </div>

                {/* Right Section: Form */}
                <div style={{ width: '280px' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>Sign Up</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required 
                            style={{ width: '100%', padding: '10px', marginBottom: '12px', backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} 
                        />
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} required 
                            style={{ width: '100%', padding: '10px', marginBottom: '12px', backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} 
                        />
                        <input type="email" name="mail" placeholder="Email Address" onChange={handleChange} required 
                            style={{ width: '100%', padding: '10px', marginBottom: '12px', backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} 
                        />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required 
                            style={{ width: '100%', padding: '10px', marginBottom: '20px', backgroundColor: '#2c2c2c', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} 
                        />
                        <button type="submit" style={{ padding: '8px 25px', backgroundColor: '#3d5afe', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Register
                        </button>
                        <button type="button" onClick={() => navigate("/")} style={{ marginTop: '20px', background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}>
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;