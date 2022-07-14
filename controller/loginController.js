const bcrypt = require('bcryptjs')
const User2 = require('../models/User2')
const passport = require('passport')


class loginController {

    // Hàm để render trang đăng nhập
    async login(req, res, next) {
        res.render('login')
    }

    // Hàm để render trang đăng ký
    async resgiter(req, res, next) {
        res.render('resgiter')
    }

    // Hàm để xử lý và request lên sever để đăng ký tài khoản 

    async createUser(req, res, next) {
        const { name, email, phone, password, password2 } = req.body // lấy dữ liệu từ form
        const Phone = await User2.find({}) // lấy tất cả các tài khoản trong database

        const check = Phone.some((e) => { // kiểm tra xem có tài khoản nào có số điện thoại này hay không
            return e.phone == phone // nếu có thì trả về true
        })

        let errors = [] // khởi tạo mảng lỗi
    

        //xử lý khi nhập khi điền vô form đăng ký
        if (!name || !phone || !email || !password || !password2) { // nếu nhập khi điền vô form đăng ký
            errors.push({ msg: 'Vui lòng nhập hết vào ô trống' }) // thêm lỗi vào mảng lỗi
        }


        // function checkNumber(params) {
        //     let regexPhoneNumber = /^((\+)33|0)[1-9](\d{2}){4}$/;
        //     if (params.match(regexPhoneNumber)) {
        //         return true
        //     } else {
        //         return false
        //     }
        // }

        // if (!checkNumber(phone)) {
        //     errors.push({ msg: 'số điện thoại không hợp lệ' })
        // }

        function test(params) { // hàm hàm kiểm tra email
            let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // hàm kiểm tra email
            if (params.match(regex)) { // nếu email hợp lệ
                return false // trả về false
            } else {
                return true //trả về true nếu email không hợp lệ
            }
        };

        if (test(email)) { // nếu email không hợp lệ
            errors.push({ msg: 'email không hợp lệ(vui lòng nhập emai phải có @ và có dấu chấm sau chữ gmail)' })
        }

        if (check) {    // nếu có tài khoản có số điện thoại này
            errors.push({ msg: 'Số điện thoại đã được sử dụng' }) // thêm lỗi vào mảng lỗi
        }

        if (password !== password2) { // nếu 2 mật khẩu không giống nhau
            errors.push({ msg: 'nhập lại mật khẩu không giống' }) // thêm lỗi vào mảng lỗi
        }
        //check pass length
        if (password.length < 6) { // nếu mật khẩu ít hơn 6 ký tự
            errors.push({ msg: 'Mật khẩu phải nên 6 ký tự' }) // thêm lỗi vào mảng lỗi
        }
        if (errors.length > 0) { // nếu có lỗi
            res.render('resgiter', { // render lại trang đăng ký
                errors, // truyền mảng lỗi vào trang đăng ký
                name, // truyền dữ liệu vào trang đăng ký
                phone,
                email,
                password,
                password2,
            })
        } else { // nếu không có lỗi
            //Validation passed
            User2.findOne({  // tìm tài khoản có email này
                email: email // nếu có thì trả về true
            })
                .then(user => { // nếu có tài khoản có email này
                    if (user) { // nếu có tài khoản có email này
                        
                        errors.push({ msg: 'email này đã được đăng ký' }) // thêm lỗi vào mảng lỗi
                        res.render('resgiter', { // render lại trang đăng ký
                            errors, // truyền mảng lỗi vào trang đăng ký
                            name,
                            phone,
                            email,
                            password,
                            password2,
                        })
                    } else { // nếu không có tài khoản có email này
                        const newUser = new User2({ // tạo mới tài khoản
                            name, // gán giá trị cho các thuộc tính
                            phone,
                            email,
                            password
                        }) // tạo mới tài khoản
                        bcrypt.genSalt(10, (err, salt) =>  // bcrypt.genSalt() là hàm mã hóa mật khẩu
                            bcrypt.hash(newUser.password, salt, (err, hash) => { // bcrypt.hash() là hàm mã hóa mật khẩu
                                if (err) throw err // nếu có lỗi
                                //set password to hashed
                                newUser.password = hash // gán giá trị cho các thuộc tính
                                //Save user   
                                newUser.save()  // lưu tài khoản mới vào database
                                    .then(user => { // nếu lưu thành công
                                        req.flash('success_msg', 'bạn đã đăng ký thành công, giờ hãy đăng nhập ngay.') // thông báo đăng ký thành công
                                        res.redirect('/login') // chuyển đến trang đăng nhập
                                    })
                                    .catch(err => console.log(err))
                            }))
                    }
                })
        }

    }

    requestLogin(req, res, next) { // hàm xử lý đăng nhập
      
        passport.authenticate('local', { // passport.authenticate() là hàm xác thực tài khoản
            successRedirect: '/', // nếu xác thực thành công
            failureRedirect: '/login', // nếu xác thực thất bại
            failureFlash: true, // hiển thị thông báo
        })(req, res, next) // gọi hàm xác thực tài khoản
    } 
 
} 

module.exports = new loginController()