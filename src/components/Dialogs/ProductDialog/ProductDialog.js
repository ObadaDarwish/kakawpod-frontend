import React, { useEffect, useRef, useState } from 'react';
import DialogWrapper from '../DialogWrapper/DialogWrapper';
import InputUI from '../../UI/InputUI/InputUI';
import ButtonUI from '../../UI/ButtonUI/ButtonUI';
import useCallServer from '../../../hooks/useCallServer';
import {
    errorNotification,
    successNotification,
} from '../../../utils/notification-utils';

const ProductDialog = ({ open, product, onClosingDialog, close }) => {
    const [images, setImages] = useState([]);
    const [imagesBlob, setImagesBlob] = useState();
    let dynamicRefs = useRef({});
    let updatedProduct = {};
    const [, , , , callServer, loading, setLoading] = useCallServer();
    for (let key in product) {
        dynamicRefs.current[key] = React.createRef();
    }
    useEffect(() => {
        let canUpdate = true;
        if (canUpdate) {
            if (product.images.length) {
                let mappedImages = product.images.map((img) => img.url);
                setImages(mappedImages);
            } else {
                setImages([]);
            }
        }
        return () => {
            canUpdate = false;
        };
    }, [product]);
    const onImageChange = (event) => {
        if (event.target.files) {
            let imageArray = [];
            setImagesBlob(event.target.files);
            [...event.target.files].forEach((img) => {
                imageArray.push(URL.createObjectURL(img));
            });
            setImages((prevState) => {
                return [...prevState, ...imageArray];
            });
        }
    };

    const handleProduct = () => {
        let handlingType = product.name === '' ? 'create' : 'update';
        setLoading(true);
        let formData = new FormData();
        let uploadImagePromise = new Promise((resolve, reject) => {
            if (imagesBlob) {
                [...imagesBlob].forEach((img) => {
                    formData.append('product_image', img);
                });
                callServer(
                    'POST',
                    `${process.env.REACT_APP_API_ENDPOINT}/admin/product/image`,
                    formData,
                    {
                        'Content-Type': 'multipart/form-data',
                    }
                )
                    .then((response) => {
                        resolve({ images: response.data.images });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            } else {
                resolve({ images: [] });
            }
        });
        uploadImagePromise.then((resolved, rejected) => {
            if (rejected) {
                if (rejected.response) {
                    setLoading(false);
                    errorNotification(
                        rejected.response.data.message,
                        'Product'
                    );
                }
            }
            let {
                name,
                description,
                ingredients,
                price,
                quantity,
                chocolate_type,
                category,
                cocoa_percentage,
                weight,
            } = dynamicRefs.current;
            let updatedImages = product.images
                ? [...product.images, ...resolved.images]
                : resolved.images;
            updatedProduct = {
                name: name.current.value,
                description: description.current.value,
                ingredients: ingredients.current.value,
                price: parseInt(price.current.value),
                quantity: parseInt(quantity.current.value),
                chocolate_type: chocolate_type.current.value,
                category: category.current.value,
                cocoa_percentage: cocoa_percentage.current.value,
                weight: parseInt(weight.current.value),
                images: updatedImages,
            };
            callServer(
                handlingType === 'create' ? 'POST' : 'PUT',
                `${process.env.REACT_APP_API_ENDPOINT}/admin/product${
                    handlingType === 'update' ? '/' + product._id : ''
                }`,
                updatedProduct
            )
                .then((response) => {
                    setImagesBlob(null);
                    onClosingDialog(
                        handlingType === 'create'
                            ? response.data.product
                            : updatedProduct
                    );
                    successNotification(
                        'Product has been uploaded successfully',
                        'Product'
                    );
                })
                .catch((err) => {
                    if (err.response) {
                        setLoading(false);
                        errorNotification(err.response.data.message, 'Product');
                    }
                })
                .finally(() => setLoading(false));
        });
    };
    return (
        <DialogWrapper
            open={open}
            close={close}
            minWidth={'60rem'}
            loading={loading}
        >
            <div className={'productDialogWrapper'}>
                <div className={'productDialogWrapper__inputWrapper'}>
                    <InputUI
                        label={'name'}
                        defaultValue={product.name}
                        reference={dynamicRefs.current.name}
                    />
                </div>
                <div className={'productDialogWrapper__inputWrapper'}>
                    <InputUI
                        label={'description'}
                        defaultValue={product.description}
                        reference={dynamicRefs.current.description}
                    />
                </div>
                <div className={'productDialogWrapper__inputWrapper'}>
                    <InputUI
                        label={'ingredients'}
                        defaultValue={product.ingredients}
                        reference={dynamicRefs.current.ingredients}
                    />
                </div>
                <div className={'productDialogWrapper__inputWrapper'}>
                    <InputUI
                        label={'price'}
                        type={'number'}
                        defaultValue={product.price}
                        reference={dynamicRefs.current.price}
                    />
                    <InputUI
                        label={'quantity'}
                        type={'number'}
                        defaultValue={product.quantity}
                        reference={dynamicRefs.current.quantity}
                    />
                </div>
                <div className={'productDialogWrapper__inputWrapper'}>
                    <InputUI
                        label={'chocolate type'}
                        defaultValue={product.chocolate_type}
                        reference={dynamicRefs.current.chocolate_type}
                    />
                    <InputUI
                        label={'category'}
                        defaultValue={product.category}
                        reference={dynamicRefs.current.category}
                    />
                </div>
                <div className={'productDialogWrapper__inputWrapper'}>
                    <InputUI
                        label={'cocoa percentage'}
                        defaultValue={product.cocoa_percentage}
                        reference={dynamicRefs.current.cocoa_percentage}
                    />
                    <InputUI
                        label={'weight'}
                        type={'number'}
                        defaultValue={product.weight}
                        reference={dynamicRefs.current.weight}
                    />
                </div>
                <div className={'productDialogWrapper__imageContainer'}>
                    <div
                        className={
                            'productDialogWrapper__imageContainer__fileInput'
                        }
                    >
                        <div
                            className={
                                'productDialogWrapper__imageContainer__fileInput__styleButton'
                            }
                        >
                            Upload image
                        </div>
                        <input
                            type="file"
                            name="myImage"
                            multiple="multiple"
                            onChange={onImageChange}
                        />
                    </div>
                    <div
                        className={
                            'productDialogWrapper__imageContainer__imagesWrapper'
                        }
                    >
                        {images.length > 0 &&
                            images.map((image) => {
                                return (
                                    <img
                                        key={image}
                                        src={image}
                                        alt="my image"
                                    />
                                );
                            })}
                    </div>
                </div>
                <div className={'productDialogWrapper__buttonWrapper'}>
                    <ButtonUI
                        name={product.name !== '' ? 'save' : 'create'}
                        width={'70%'}
                        clickHandler={handleProduct}
                    />
                </div>
            </div>
        </DialogWrapper>
    );
};

export default ProductDialog;
