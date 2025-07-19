// import jwt from 'jsonwebtoken'


// const userAuth = async (req, res, next) => {
//     const { token } = req.headers;
//     if (!token) {
//         return res.json({
//             success: false,
//             message: "Unauthorize access try again."
//         })
//     }

//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
//         if (tokenDecode.id) {
//             req.userId = tokenDecode.id
//         } else {
//             return res.json({
//                 success: false,
//                 message: "Unauthorize access please try again."
//             })
//         }
//         next();
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success: false,
//             message: error.message
//         })
//     }

// }

// export default userAuth




















import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access. Token missing.",
        });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode?.id) {
            req.body = req.body || {};
            req.body.userId = tokenDecode.id;
        } else {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access. Invalid token.",
            });
        }
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

export default userAuth;
