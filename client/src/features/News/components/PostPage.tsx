// import React from 'react';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../../../store/store';




// function PostPage(): JSX.Element {
//     const posts = useSelector((store: RootState) => store.posts.posts);
//     const user = useSelector((store: RootState) => store.auth.user);



//     return(
//         <>
//         <section className="top" id="top">
//                 <picture>
//                     <source srcSet="/img/par3.png" media="(max-width: 576px)"/>
//                     <source srcSet="/img/par2.png" media="(max-width: 1200px)"/>
//                     <img src="/img/par1.png" alt="" className="top__bg"/>
//                     </picture>
//                 <div className="container">
//                     <div className="top__wrap">
//                         <div className="bread q">
//                             <a href="/">
//                                 Главная
//                             </a>
//                             <a href="#">
//                                 Новости
//                             </a>
//                         </div>
//                         <h1>
//                             Актуальные новости PITBIT
//                         </h1>
//                         <img src="/img/top6.png" alt="" className="top__pic"/>
//                         </div>
//                 </div>
//             </section>
//             <section className="par" id="par">
//                 <div className="container">
                    
//                     <h2>
//                         ЛЕНТА НОВОСТЕЙ
//                     </h2>
//                     {user?.role === 'admin' &&( 
//                 <div className="add">
//             <button type='button' className='btnchange' onClick={openModal}>
//                 Добавить новость
//                 </button>
//                 <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={closeModal}
//                 style={customStyles}
//                 contentLabel="Добавить майнер"
//               >
//                 <h2>Добавить майнер</h2>
//                 <FormAddPost/>
//               </Modal>
//               </div>
//              )} 
//              <div className="par__row q">
//               {posts.length > 0 ? (
//             posts.map((item) => (

//                 <div className="par__items"  key={item?.id}>
//                     <small>{new Date(item?.createdAt).toLocaleString("ru-RU",
//                                     {timeZone: "Europe/Moscow",
//                                     hour12: false,
//                                     year: "numeric",
//                                     month: "numeric",
//                                     day: "numeric", 
//                                     })}
//                                     </small>
//                     <span>{item?.title}</span>
//                     <p>{item?.text}</p> 
                        
//                     {item?.img && item.img.length > 0 && item.img.map((img, index) => (
//                                         <img key={index} src={img} style={{ width: '70%' }} onClickCapture={() => window.open(img)} alt="" />
//                                     ))}
                                    
//                                     {item?.video && item.video.length > 0 && (
//                                         <video src={item.video[0]} controls={true} style={{ width: '100%', borderRadius: '10px'}} poster={item.preview} />
//                                     )}
//                 </div>
                
//             ))
//         ) : (
            
//             <p>Новостей нет</p>
            
                    
                
                    
//         )}
//                 </div>
//                 </div>
//             </section>
           
//         </>
//       );
    
// };

// export default PostPage;