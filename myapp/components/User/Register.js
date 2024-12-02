import { Text, View, Image } from "react-native"
import MyStyles from "../../Styles/MyStyles"
import { TextInput, TouchableRipple, Button, HelperText, } from "react-native-paper"
import { useState } from "react";
import APIs, { endpoints } from "../../configs/APIs";


const picker = async () => {
    // useState là đối tượng -> user 

    const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
    // Nếu không có quyền truy cập vào bộ ảnh thì sẽ đưa ra thông báo
    if (status !== 'granted') {
        alert("iCourseApp", "Permissions denied!");
        //Ngược lại
    } else {
        let result =
            await ImagePicker.launchImageLibraryAsync();
        //Nếu không bám hủy sẽ xử lý lấy ảnh
        if (!result.canceled)
            change('avatar', result.assets[0])

    }
};

// Các trường trong này phải đúng tên với tên trong backed
const Register = () => {
    const fields = [{
        label: "Tên",
        icon: "text",
        fields: "first_name"
    },
    {
        label: "Họ và tên lót",
        icon: "text",
        fields: "last_name"
    }, {
        label: "Tên đăng nhập",
        icon: "text",
        fields: "username",

    },
    {
        label: "Mật khẩu",
        icon: "eye",
        fields: "password",
        secureTextEntry: true,
    },
    {
        label: "Xác nhận mật khẩu",
        icon: "eye",
        fields: "confirm",
        secureTextEntry: true,
        // Hiện dấu   . .  . mật khẩu 
    }
    ]
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error , setError] = useState(false);
    const change = (fields, value) => {

        setUser(current => {
            //Phải bổ fields vào [] để nó lấy đc giá trị ra làm key
            return { ...current, [fields]: value }


        })
    }
    const register = async () => {
        if (user.password !== user.confirm)
            setError(true);
        else {
            setError(false);
            setLoading(true);
        try {
            // Phải có form để hiện dữ liệu
            let form = new FormData();

            let res = await APIs.post(endpoints['register'])
        } catch (ex) {
            console.error(ex);

        } finally {
            setLoading(false);
        }
    }

        }
        

    return (
        <View style={MyStyles.container}>
            <Text style={MyStyles.subject}>ĐĂNG KÝ NGƯỜI DÙNG</Text>
            {fields.map(f => <TextInput value={user[f.fields]} onChangeText={t => change(f.fields, t)} key={f.id} style={MyStyles.margin} label={f.label} secureTextEntry right={<TextInput.Icon icon={f.icon} />} />)}
            <TouchableRipple onPress={picker}>
                <Text style={MyStyles.margin}>Chọn ảnh đại diện....</Text>
            </TouchableRipple>
            {user.avatar && <Image style={[MyStyles.avatar, MyStyles.margin]} source={{ uri: user.avatar.uri }} />}
            <HelperText type="error" visible={error}>
                MẬT KHẢU KHÔNG KHỚP
            </HelperText>
            <Button loading={loading} onPress={register} style={MyStyles.margin} mode="contained" icon="account">ĐĂNG KÝ</Button>
        </View>
    )
};

export default Register; 