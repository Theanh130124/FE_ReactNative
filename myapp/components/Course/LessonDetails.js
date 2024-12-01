// import React from "react";
// import APIs, { endpoints } from "../../configs/APIs";
// import { ActivityIndicator, View, Text, useWindowDimensions, ScrollView } from "react-native";
// import { Card, Chip } from "react-native-paper";
// import MyStyles from "../../Styles/MyStyles";
// import RenderHtml from 'react-native-render-html';
// import { isCloseToBottom } from "../utils/Utils";

// const LessonDetails = ({ route }) => {
//     const [lesson, setLessons] = React.useState(null)
//     const lessonId = route.params?.lessonId
//     const [comments , setComments] = React.useState(null)
    
//     // Content render lại html
//     const { width } = useWindowDimensions();


//     // Gọi apis
//     const loadLessons = async () => {
//         try {
//             let res = await APIs.get(endpoints['lessons-details'](lessonId))
//             //Phải set vậy vì nó dang là đối tượng phải set vè dạng dữ liệu
//             setLessons(res.data)

//         } catch (ex) {
//             console.error(ex)
//         }
//     }
//     const loadComments = async () => {
//         try {
//             let res = await APIs.get(endpoints['comments'](lessonId))
//             setComments(res.data);

//         }catch(err){
//             console.error(err);
//         }
//     }
//     const loadMoreData = () => {
//         if (!comments && isCloseToBottom()){
//             loadComments()
//         }
//     }

//     React.useEffect(() => {
//         loadLessons();
//     }, [lessonId])
//     return (
//         <View>
//             <ScrollView onScroll={loadMoreData}>
//             {/* Nếu chưa có dữ liệu thì load người lại bắt đầu từ <></> */}
//             {lesson === null ? <ActivityIndicator /> : <>
//                 <Card>
//                     {/* <Card.Title title="Card Title" subtitle="Card Subtitle"  /> */}
//                     <View style={MyStyles.row}>
//                         {/* Nhớ luôn truyền Key để nó biết của ai */}
//                         {lesson.tags.map(t => <Chip key={t.id} style={MyStyles.margin}>  {t.name}</Chip>)}
//                     </View>
//                     <Card.Cover source={{ uri: lesson.image }} />
//                     <Card.Content>
//                         {/* Tên các attrribute phải đúng với trên BE */}
//                         <Text variant="titleLarge">{lesson.subject}</Text>
//                         {/* content đang là mã HTML sẽ phải xử lý */}

//                         <Text variant="bodyMedium">
//                             <RenderHtml
//                                 contentWidth={width}
//                                 source={{html : lesson.content}}
//                             />
//                             </Text>
//                         {/* Tag là mảng nên xử lý */}
//                     </Card.Content>
//                     {/* <Card.Actions>
//                         <Button>Cancel</Button>
//                         <Button>Ok</Button>
//                     </Card.Actions> */}
//                 </Card></>}
//                 </ScrollView>
//         </View>
//     )

// }

// export default LessonDetails;
import React from "react";
import APIs, { endpoints } from "../../configs/APIs";
import { ActivityIndicator, View, Text, useWindowDimensions, ScrollView } from "react-native";
import { Card, Chip } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import RenderHtml from 'react-native-render-html';
import { isCloseToBottom } from "../utils/Utils";

const LessonDetails = ({ route }) => {
    // State để lưu dữ liệu bài học và bình luận
    const [lesson, setLessons] = React.useState(null);
    // Lấy lessonId từ params của route, nếu không có thì gán null
    const lessonId = route?.params?.lessonId ?? null;  
    const [comments, setComments] = React.useState(null);

    // Lấy chiều rộng màn hình để render HTML phù hợp
    const { width } = useWindowDimensions();

    // Hàm để tải thông tin bài học từ API
    const loadLessons = async () => {
        try {
            let res = await APIs.get(endpoints['lessons-details'](lessonId));  // Gọi API lấy chi tiết bài học
            setLessons(res.data);  // Lưu dữ liệu bài học vào state
        } catch (ex) {
            console.error(ex);  // Xử lý lỗi nếu gọi API thất bại
        }
    };

    // Hàm để tải bình luận từ API
    const loadComments = async () => {
        try {
            let res = await APIs.get(endpoints['comments'](lessonId));  // Gọi API lấy bình luận của bài học
            setComments(res.data);  // Lưu dữ liệu bình luận vào state
        } catch (err) {
            console.error(err);  // Xử lý lỗi nếu gọi API thất bại
        }
    };

    // Hàm kiểm tra khi nào cần tải thêm bình luận (khi cuộn xuống cuối trang)
    const loadMoreData = () => {
        if (comments && isCloseToBottom()) {  // Kiểm tra có bình luận và cuộn đến cuối trang
            loadComments();  // Tải thêm bình luận nếu điều kiện thỏa mãn
        }
    };

    // useEffect để tải dữ liệu bài học khi lessonId thay đổi
    React.useEffect(() => {
        loadLessons();  // Tải dữ liệu bài học mỗi khi lessonId thay đổi
    }, [lessonId]);

    return (
        <View>
            <ScrollView onScroll={loadMoreData}>  {/* Đoạn mã sẽ gọi hàm loadMoreData khi cuộn trang */}
                {/* Nếu chưa có dữ liệu bài học, hiển thị ActivityIndicator (vòng xoay tải) */}
                {lesson === null ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <Card>
                            {/* Hiển thị các tag của bài học */}
                            <View style={MyStyles.row}>
                                {lesson.tags?.map(t => (  // Kiểm tra xem tags có tồn tại không
                                    <Chip key={t.id} style={MyStyles.margin}>
                                        {t.name}  {/* Hiển thị tên tag */}
                                    </Chip>
                                ))}
                            </View>
                            {/* Hiển thị ảnh bài học */}
                            <Card.Cover source={{ uri: lesson.image }} />
                            <Card.Content>
                                {/* Hiển thị tên môn học */}
                                <Text variant="titleLarge">{lesson.subject}</Text>
                                {/* Render nội dung bài học dưới dạng HTML */}
                                <Text variant="bodyMedium">
                                    <RenderHtml contentWidth={width} source={{ html: lesson.content }} />
                                </Text>
                            </Card.Content>
                        </Card>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default LessonDetails;
