import React from "react";
import APIs, { endpoints } from "../../configs/APIs";
import { ActivityIndicator, View, Text, useWindowDimensions, ScrollView } from "react-native";
import { Card, Chip } from "react-native-paper";
import MyStyles from "../../Styles/MyStyles";
import RenderHtml from 'react-native-render-html';
import { isCloseToBottom } from "../utils/Utils";

const LessonDetails = ({ route }) => {
    const [lesson, setLessons] = React.useState(null)
    const lessonId = route.params?.lessonId
    const [comments , setComments] = React.useState(null)
    c
    // Content render lại html
    const { width } = useWindowDimensions();


    // Gọi apis
    const loadLessons = async () => {
        try {
            let res = await APIs.get(endpoints['lessons-details'](lessonId))
            //Phải set vậy vì nó dang là đối tượng phải set vè dạng dữ liệu
            setLessons(res.data)

        } catch (ex) {
            console.error(ex)
        }
    }
    const loadComments = async () => {
        try {
            let res = await APIs.get(endpoints['comments'](lessonId))
            setComments(res.data);

        }catch(err){
            console.error(err);
        }
    }
    const loadMoreDate = () => {
        if (!comments && isCloseToBottom()){
            loadComments()
        }
    }

    React.useEffect(() => {
        loadLessons();
    }, [lessonId])
    return (
        <View>
            <ScrollView onScroll={loadMoreData}>
            {/* Nếu chưa có dữ liệu thì load người lại bắt đầu từ <></> */}
            {lesson === null ? <ActivityIndicator /> : <>
                <Card>
                    {/* <Card.Title title="Card Title" subtitle="Card Subtitle"  /> */}
                    <View style={MyStyles.row}>
                        {/* Nhớ luôn truyền Key để nó biết của ai */}
                        {lesson.tags.map(t => <Chip key={t.id} style={MyStyles.margin}>  {t.name}</Chip>)}
                    </View>
                    <Card.Cover source={{ uri: lesson.image }} />
                    <Card.Content>
                        {/* Tên các attrribute phải đúng với trên BE */}
                        <Text variant="titleLarge">{lesson.subject}</Text>
                        {/* content đang là mã HTML sẽ phải xử lý */}

                        <Text variant="bodyMedium">
                            <RenderHtml
                                contentWidth={width}
                                source={{html : lesson.content}}
                            />
                            </Text>
                        {/* Tag là mảng nên xử lý */}
                    </Card.Content>
                    {/* <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions> */}
                </Card></>}
                </ScrollView>
        </View>
    )

}

export default LessonDetails;