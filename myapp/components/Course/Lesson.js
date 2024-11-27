import { Text, TouchableOpacity, View } from "react-native";
import MyStyles from "../../Styles/MyStyles";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import Item from "../utils/Item";
import APIs , {endpoints} from "../../configs/APIs";
// Nhớ qua bên App.js viết

const Lesson = (route) => {
    //Nhớ thêm APis 
    
    const [lessons, setLessons] = React.useState(null);
    const courseId = route.params?.courseId || null ; 

    const loadLessons = async () => {
        try {
            let res = await APIs.get(endpoints['lessons'](courseId));
            // Không có res.result.data vì không có phân trang
            // console.log("Course ID:", courseId);//Để debug
            setLessons(res.data)
        } catch (err) {
            console.error(err)
            // console.log("Course ID:", courseId); 
            // console.log("Received courseId:", route.params?.courseId);
        }
    }
    React.useEffect(() => {
        loadLessons();
    }, [courseId]);
    // Kiểm tra cái này truyền từ bên kia qua có null không -> không thì lấy

    return (
        <View style={[MyStyles.container]}>
            <Text>Danh mục bài học {courseId}</Text>
            {/* Nếu không có lesson thì cho nó có biểu tượng loading sao đó bọc trong  Fragment để bọc được nhiều thẻ  */}
            {lessons === null ? <ActivityIndicator /> : <>
                {lessons.map(l => <TouchableOpacity key={l.id}>
                    <Item instance={l} />
                </TouchableOpacity>)}
            </>
            }
        </View>
    );

}
export default Lesson;























































// Hãy cùng phân tích từng phần trong đoạn code của bạn:

// 1. const [lessons, setLessons] = React.useState(null);
// Ý nghĩa
// Đây là cú pháp React Hook useState, được dùng để khai báo một state trong functional component.
// lessons là giá trị state, ban đầu được khởi tạo bằng null.
// setLessons là hàm dùng để cập nhật giá trị của lessons.
// Tại sao dùng?
// Để lưu trữ và quản lý danh sách bài học (lessons) khi dữ liệu được tải từ API.
// State được cập nhật sẽ làm component render lại, đảm bảo dữ liệu hiển thị trên giao diện luôn đồng bộ với dữ liệu thực tế.
// 2. const loadLessons = async () => { ... }
// Ý nghĩa
// Đây là một hàm bất đồng bộ (async) để tải dữ liệu từ API.
// Hàm sử dụng APIs.get() để thực hiện yêu cầu HTTP GET đến endpoint endpoints['lessons'], với tham số courseId.
// Khi API trả về dữ liệu (res.data), nó sẽ được lưu vào state lessons thông qua setLessons.
// Tại sao dùng?
// API có thể mất một thời gian để phản hồi. Dùng async/await đảm bảo rằng mã thực thi đồng bộ hơn, dễ đọc hơn so với việc dùng callback hoặc .then().
// 3. React.useEffect(() => { loadLessons }, [courseId]);
// Ý nghĩa
// useEffect là một React Hook được dùng để thực hiện các tác vụ phụ (side effects) như gọi API, lắng nghe sự kiện, hoặc cập nhật DOM.
// Ở đây, useEffect được thiết kế để gọi hàm loadLessons mỗi khi courseId thay đổi.
// Cơ chế
// useEffect có hai tham số:
// Hàm callback: Chứa logic bạn muốn thực thi (ở đây là gọi loadLessons).
// Mảng phụ thuộc ([courseId]): Quyết định khi nào callback được gọi lại.
// Khi courseId thay đổi:
// useEffect phát hiện sự thay đổi và gọi lại hàm loadLessons.
// Tại sao dùng?
// Đảm bảo API được gọi lại mỗi khi courseId thay đổi.
// Tránh việc gọi API không cần thiết khi courseId không thay đổi.
// 4. try { ... } catch (err) { ... }
// Ý nghĩa
// try-catch được sử dụng để xử lý lỗi khi gọi API.
// Nếu APIs.get() gặp lỗi (ví dụ, lỗi mạng, endpoint không tồn tại), đoạn mã trong catch sẽ chạy và log lỗi vào console.
// Tại sao dùng?
// Đảm bảo ứng dụng không bị crash khi có lỗi trong việc gọi API.
// Giúp bạn dễ dàng phát hiện và debug vấn đề.