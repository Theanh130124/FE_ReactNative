import React from "react";
import { Text, View, ActivityIndicator, Image, StatusBar, ScrollView, RefreshControl } from "react-native";
import { Chip, List, Searchbar } from "react-native-paper";
import moment from "moment";
import "moment/locale/vi";
import MyStyles from "../../Styles/MyStyles";
import APIs, { endpoints } from "../../configs/APIs";

moment.locale("vi");

const Course = () => {
  const [categories, setCategories] = React.useState(null);
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [cateId, setCateId] = React.useState("");
  const [page , usepage] = React.useState(1)

  const loadCates = async () => {
    try {
      let res = await APIs.get(endpoints["categories"]);
      setCategories(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  const loadCourses = async () => {
    try {
      setLoading(true); //Truyền trang ở dòng dưới
      let url = `${endpoints['courses']}?q=${q}&category_id=${cateId}&page=${page}`;
      let res = await APIs.get(url);
      if (page ===1)
        setCourses(res.data.results);
    // current là khóa học trang hiện tại -> nối thêm các trang mới 
      else
        setCourses(current => {
            return [...current, ...res.data.results];
        })
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadCates();
  }, []);

  React.useEffect(() => {
    loadCourses();
  }, [q, cateId ,page]);
//   Kiểm tra tới cuối trang chưa
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
const loadMore =(nativeEvent) => {
    //gần tới cuối trang
    if (isCloseToBottom(nativeEvent)) {
        usepage(page + 1); //đi tới trang tiếp
    }
}

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
      <View style={[MyStyles.container, MyStyles.margin]}>
        <View style={MyStyles.row}>
          <Chip
            mode={!cateId ? "outlined" : "flat"}
            style={MyStyles.margin}
            onPress={() => setCateId("")}
            icon="shape-outline"
          >
            Tất cả
          </Chip>
          {categories === null ? (
            <ActivityIndicator />
          ) : categories.length === 0 ? (
            <Text>Chưa có danh mục</Text>
          ) : (
            categories.map((c) => (
              <Chip
                style={MyStyles.margin}
                key={c.id}
                icon="shape-outline"
                onPress={() => setCateId(c.id)
                    
                }
              >
                {c.name}
              </Chip>
            ))
          )}
        </View>
        <Searchbar
          placeholder="Tìm khóa học..."
          value={q}
          onChangeText={(text) => setQ(text)}
        />
        {/* onScroll để loadMore bắt sự kiện cuối trang */}
        <ScrollView onScroll={loadMore}
        // Thêm dòng này server thêm data thì nó sẽ reload lại vì nó gọi loadCourses
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadCourses} />
          }
        >
          {courses.map((c) => (
            <List.Item
              style={MyStyles.margin}
              key={c.id}
              title={c.subject}
              description={moment(c.created_date).format("DD/MM/YYYY")}
              left={() => (
                <Image style={MyStyles.avatar} source={{ uri: c.image }} />
              )}
            />
          ))}
          {loading && <ActivityIndicator />}
        </ScrollView>
      </View>
    </>
  );
};

export default Course;
