import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import FormAddPost from './FormAddPost';
import Modal, { type Styles } from 'react-modal';

const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '20px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxHeight: '70%',
    overflowY: 'auto',
  },
};

function NewsPage(): JSX.Element {
  const posts = useSelector((store: RootState) => store.posts.posts);
  const user = useSelector((store: RootState) => store.auth.user);

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  return (
    <>
      <section className="top" id="top">
        <picture>
          <source srcSet="/img/par3.png" media="(max-width: 576px)" />
          <source srcSet="/img/par2.png" media="(max-width: 1200px)" />
          <img src="/img/par1.png" alt="" className="top__bg" />
        </picture>
        <div className="container">
          <div className="top__wrap">
            <div className="bread q">
              <a href="/">Главная</a>
              <a href="/news">Новости</a>
            </div>
            <h1>Актуальные новости PITBIT</h1>
            <img src="/img/top6.png" alt="" className="top__pic" />
          </div>
        </div>
      </section>
      <section className="par" id="par">
        <div className="container">
          <h2>ЛЕНТА НОВОСТЕЙ</h2>
          {user?.role === 'admin' && (
            <div className="add">
              <button type="button" className="btnchange" onClick={openModal}>
                Добавить новость
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Добавить майнер"
              >
                <h2>Добавить майнер</h2>
                <FormAddPost />
              </Modal>
            </div>
          )}
          <div className="par__row q">
            {posts.length > 0 ? (
              posts.map((item) => (
                <a className="par__items" key={item?.id}>
                  <small>
                    {new Date(item?.createdAt).toLocaleString('ru-RU', {
                      timeZone: 'Europe/Moscow',
                      hour12: false,
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                    })}
                  </small>
                  <span>{item?.title}</span>
                  <p>{item?.text}</p>

                  {item?.img &&
                    item.img.length > 0 &&
                    item.img.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        style={{ width: '70%' }}
                        onClickCapture={() => window.open(img)}
                        alt=""
                      />
                    ))}

                  {item?.video && item.video.length > 0 && (
                    <video
                      src={item.video[0]}
                      controls={true}
                      style={{ width: '100%', borderRadius: '10px' }}
                      poster={item.preview}
                      
                    />
                  )}
                </a>
              ))
            ) : (
              <p>Новостей нет</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default NewsPage;
