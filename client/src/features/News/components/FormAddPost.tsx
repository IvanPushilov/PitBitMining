/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import '../../Miners/styles/form.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postAdd } from '../postsSlice';
import ClipLoader from 'react-spinners/ClipLoader'; 

const FormAddPost = (): JSX.Element => {
  const [img, setImg] = useState<FileList | null | undefined>(null);
  const [video, setVideo] = useState<FileList | null | undefined>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [preview, setPreview] = useState<FileList | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const postAddFetch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true); // Устанавливаем состояние загрузки в true

    const imgFile = img?.[0];
    const previewFile = preview?.[0];
    const videoFile = video?.[0];
    const formData = new FormData();

    formData.append('title', title);
    formData.append('text', text);
    formData.append('video', videoFile !== null && videoFile !== undefined ? videoFile : '');
    formData.append('preview', previewFile !== null && previewFile !== undefined ? previewFile : '');
    

    if (imgFile) {
      Array.from(img).forEach(file => {
        formData.append('img', file);
      });
    }    

    try {
      await dispatch(postAdd(formData)).unwrap();
      toast.success('Новость опубликована!');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при публикации новости.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add__form__container">
      <div className="form-add-miner">
        <form className="add__form" onSubmit={postAddFetch}>
          <textarea
            className="input-order"
            value={title}
            placeholder="Заголовок"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="input-order"
            value={text}
            placeholder="Содержание"
            onChange={(e) => setText(e.target.value)}
          />
          <label>
            Фото
            <input
              className="input-order"
              type="file"
              placeholder="img"
              multiple
              onChange={(e) => setImg(e.target.files)}
            />
          </label>
          <label>
            Видео
            <input
              className="input-order"
              type="file"
              placeholder="video"
              multiple
              onChange={(e) => setVideo(e.target.files)}
            />
          </label>
          <label>
            Превью
            <input
              className="input-order"
              type="file"
              placeholder="img"
              onChange={(e) => setPreview(e.target.files)}
            />
          </label>
          <button type="submit" disabled={isLoading}>Опубликовать</button>
        </form>
        {isLoading && (
          <div className="spinner-container">
            <ClipLoader color="#36D7B7" loading={isLoading} size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormAddPost;
