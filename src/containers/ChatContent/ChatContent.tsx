import React, { FC, useState } from 'react';
import styleCss from './ChatContent.module.scss';

import 'moment/locale/vi';
import moment from 'moment';
import Image from 'next/image';

import { typeItemContentChat } from '@/common/enums/enum';
import {
  Navigation,
  InfoUserChat,
  ItemContentChat,
  Layout,
} from '@/components';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Drawer, Popover, Upload } from 'antd';

import dynamic from 'next/dynamic';
const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false },
);

export const ChatContent: FC<IChatContent> = ({
  infoFriend,
  messages,
  contentChat,
  setContentChat,
  handleClick,
  userId,
  fileImage,
  handleChange,
  handleUploadImage,
}) => {
  const [visible, setVisible] = useState(false);

  // Handle Change Content Chat
  const handleChangeContentChat = (e: any) => {
    setContentChat(e.target.value);
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    setContentChat(`${contentChat}${emojiObject.emoji}`);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout title="Chat Content" isHeader={false} isFooter={false}>
      <section className={styleCss.chatContent}>
        <Navigation />
        <InfoUserChat
          avatar={infoFriend.avatar}
          title={infoFriend.name}
          content={`Đã kết đôi ${moment(infoFriend.createAt)
            .locale('vi')
            .fromNow()}`}
        />
        <section className={styleCss.chatContent__content}>
          {messages.length !== 0 &&
            messages.map((message: IMessage) => {
              return (
                <ItemContentChat
                  key={message.id}
                  id={message.id}
                  time={`${moment(message.createAt).format('LT')}, ${moment(
                    message.createAt,
                  ).format('LL')}`}
                  content={message.content}
                  image={message.image}
                  type={
                    userId === message.senderId
                      ? typeItemContentChat.YOU
                      : typeItemContentChat.FRIEND
                  }
                />
              );
            })}
        </section>
        <section className={styleCss.chatContent__func}>
          <button className={styleCss.chatContent__btn} onClick={showDrawer}>
            <Image
              src="/assets/images/add-gift.svg"
              width={24}
              height={24}
              alt="Add"
            />
          </button>

          <Drawer
            title="Chọn hình ảnh"
            placement="bottom"
            closable={false}
            onClose={onClose}
            visible={visible}
            getContainer={false}
            style={{ position: 'absolute' }}
          >
            <Upload
              listType="picture"
              fileList={[...fileImage]}
              accept={'.png, .jpg, .svg'}
              maxCount={1}
              onPreview={handleUploadImage}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Drawer>

          <form className={styleCss.chatContent__form} onSubmit={handleClick}>
            <input
              type="text"
              className={styleCss.chatContent__input}
              placeholder="Aa"
              value={contentChat}
              onChange={handleChangeContentChat}
            />

            <Popover
              placement="topRight"
              title={''}
              content={
                <Picker onEmojiClick={onEmojiClick} disableSearchBar native />
              }
              trigger="click"
            >
              <div className={styleCss.chatContent__emoji}>
                <Image
                  src="/assets/images/emoji.svg"
                  width={24}
                  height={24}
                  alt="Emoji"
                />
              </div>
            </Popover>
          </form>
          <button
            className={styleCss.chatContent__btn}
            type="button"
            onClick={handleClick}
          >
            <Image
              src="/assets/images/send-message.svg"
              width={36}
              height={36}
              alt="Send Message"
            />
          </button>
        </section>
      </section>
    </Layout>
  );
};
