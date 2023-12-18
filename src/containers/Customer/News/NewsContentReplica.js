import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import Tab from "../../HomePage/Section/Tab";
import HomeFooter from "../../HomePage/HomeFooter";
import { withRouter } from "react-router";
import logo from "../../../assets/news-content.jpg";
import { sendContactEmail } from "../../../services/userService";
import { toast } from "react-toastify";
import { CommonUtils } from "../../../utils";

class NewsDetailReplica extends Component {
  render() {
    return (
      <>
        <HomeHeader />
        <Tab />
        <div className="container-fluid d-flex my-3">
          <img
            src={logo}
            alt="prod-img"
            style={{
              maxWidth: "500px",
              maxHeight: "500px",
            }}
          />
          <div>
            <h5 className="text-center text-primary font-weight-bold">
              HỘI NGHỊ CHUYÊN NGÀNH VỀ CHỦ ĐỀ GIẤY & CÔNG NGHỆ IN ẤN
            </h5>
            <div className="container d-flex flex-column">
              <h5>
                🌐Sáng 10/11/2023, Hội nghị Chuyên ngành về chủ đề Giấy & Công
                nghệ In ấn được tổ chức bởi AHK Việt Nam và Hội chợ Công nghệ
                Drupa – sự kiện triển lãm thiết bị in ấn lớn nhất thế giới của
                Messe Düsseldorf đã diễn ra tại TP. Hồ Chí Minh. Hội nghị mang
                đến cho các doanh nghiệp trong ngành cái nhìn tổng quan về những
                xu hướng quan trọng trong ngành Giấy - In ấn và Bao bì trên toàn
                cầu; giải pháp cũng như phương pháp thực tiễn tốt nhất để tối ưu
                hoạt động sản xuất và kinh doanh.
              </h5>
              <h5>
                👉Hội nghị có sự góp mặt của nhiều diễn giả, chuyên gia từ
                Drupa, VDMA, Messe Düsseldorf và AHK Việt Nam. Các chuyên gia đã
                chia sẻ về các chủ đề như Đổi mới, Bền vững, Số hóa và Công nghệ
                trong ngành. Hội nghị cũng có 3 buổi tọa đàm thảo luận về tính
                bền vững, giới tuyến kỹ thuật số tiếp theo và công nghệ đến từ
                Châu Âu.
              </h5>
              <h5>
                📌Tại hội nghị, đại diện Hội In TP. HCM – Ông Nguyễn Thái Linh –
                Phó chủ tịch Hội In TPHCM, Tổng Giám Đốc Công Ty TNHH Giấy Vi
                Tính Liên Sơn chia sẻ về các xu hướng phát triển của ngành in
                Việt Nam bao gồm: phát triển theo các lĩnh vực thương mại, số
                hoá, công nghệ in và chuyển đổi số hướng tới nhà máy sản xuất
                thông minh. Ông Nguyễn Thái Linh khẳng định Hội In TP. HCM luôn
                ủng hộ và thúc đẩy các doanh nghiệp in tìm kiếm các công nghệ,
                giải pháp và vật liệu tiên tiến, khai thác hiệu quả thiết bị
                truyền thống và đầu tư vào nguồn nhân lực và hệ thống quản trị
                sản xuất in.
              </h5>
              <h5>
                📌Hội chợ Triển lãm Drupa 2024 sẽ diễn ra từ 28/5 đến 7/7/2024
                tại Düsseldorf, Đức. Đây là nơi các doanh nghiệp in ấn hàng đầu
                thế giới sẽ trình diễn những công nghệ mới, sản phẩm mới và
                chiến dịch toàn cầu của họ.
              </h5>
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewsDetailReplica)
);
