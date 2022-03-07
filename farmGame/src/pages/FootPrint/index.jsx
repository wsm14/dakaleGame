import React, { useState, useEffect } from 'react';
import { fetchFarmGetTravelRewardListPage, fetchShareGetNewShareInfo } from '@/services/game';
import { filterList } from '@/utils/game';
import evens from '@/utils/evens';
import TitleBlock from '@/components/TitleBlock';
import FooterModal from '@/components/FooterModal';
import { Toast } from 'antd-mobile';
import { history } from 'umi';
import './index.less';

import footTitle from '@/asstes/common/footTitle.png';

const index = () => {
  const [page, setPage] = useState(1);
  const [footObj, setFootObj] = useState({});
  const [visible, setVisible] = useState(false);
  const [footItem, setFootItem] = useState({});
  const [shareImg, setShareImg] = useState(''); //二维码图片
  // useEffect(() => {
  //   return () => {
  //     evens.$emit('tickInit');
  //   };
  // }, []);
  useEffect(() => {
    getList();
    getShareImg();
  }, [page]);

  const getList = async () => {
    const res = await fetchFarmGetTravelRewardListPage({ page: page, limit: 4 });

    if (res.success) {
      const { content = {} } = res;
      content.recordList = filterList(content.recordList || [], 4);
      setFootObj(content);
    }
  };

  //获取二维码
  const getShareImg = async () => {
    const res = await fetchShareGetNewShareInfo({
      shareType: 'game',
      subType: 'shareGameImage',
      needHyaline: '1',
    });
    const { content = {} } = res;
    const { shareInfo = {} } = content;
    setShareImg(shareInfo.qcodeUrl);
  };
  return (
    <div className="footPrint">
      <TitleBlock
        back={() => {
          history.goBack();
        }}
      ></TitleBlock>
      <div className="footPrint_titleImg">
        <img src={footTitle} alt="" />
      </div>
      <div className="footPrint_content">
        <div className="footPrint_padding">
          {(footObj.recordList || []).map((item, index) => (
            <div
              key={`${index}1`}
              className="footPrint_item"
              onClick={() => {
                if (item.image) {
                  setVisible(true);
                  setFootItem(item);
                }
              }}
            >
              <img src={item.image} alt="" className={item.image ? 'footPrint_show' : null} />
            </div>
          ))}
        </div>
        <div className="footPrint_button">
          <div
            onClick={() => {
              if (page > 1) {
                setPage((e) => e - 1);
              } else {
                Toast.show({
                  content: '当前为第一页',
                });
              }
            }}
          >
            上一页
          </div>
          <div
            onClick={() => {
              if (parseInt(footObj.total / 4) === 0) {
                Toast.show({
                  content: '当前为最后一页',
                });
                return false;
              }

              if (footObj.total % 4 !== 0 && parseInt(footObj.total / 4) === page - 1) {
                Toast.show({
                  content: '当前为最后一页',
                });
                return false;
              }

              if (footObj.total % 4 === 0 && parseInt(footObj.total / 4) === page) {
                Toast.show({
                  content: '当前为最后一页',
                });
                return false;
              }

              setPage((e) => e + 1);
            }}
          >
            下一页
          </div>
        </div>
      </div>

      {/* 弹窗 */}
      <FooterModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        data={footItem}
        shareImg={shareImg}
      ></FooterModal>
    </div>
  );
};

export default index;
