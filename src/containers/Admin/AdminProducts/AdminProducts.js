import React, { useRef, useState } from 'react';
import ButtonUI from '../../../components/UI/ButtonUI/ButtonUI';
import DataPrompt from '../../../components/DataPrompt/DataPrompt';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { useLocation } from 'react-router-dom';
import useFetchDataScroll from '../../../hooks/useFetchDataScroll';
import CircularLoadingIndicator from '../../../components/LoadingIndicator/CircularLoadingIndicator';
import ProductDialog from '../../../components/Dialogs/ProductDialog/ProductDialog';
import ConfirmDialog from '../../../components/Dialogs/ConfirmDialog/ConfirmDialog';
import useCallServer from '../../../hooks/useCallServer';
import {
    errorNotification,
    successNotification,
} from '../../../utils/notification-utils';

const queryString = require('query-string');
const AdminProducts = () => {
    const location = useLocation();
    const tbodyRef = useRef();
    const [, , , , callServer] = useCallServer();
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    let dialogDefaultValue = {
        name: '',
        description: '',
        ingredients: '',
        price: '',
        quantity: '',
        chocolate_type: '',
        category: '',
        cocoa_percentage: '',
        weight: '',
        images: [],
    };
    let { page = 1 } = queryString.parse(location.search);
    const [productsPage, setProductsPage] = useState(page);
    let [productsLoading, products, setProducts] = useFetchDataScroll(
        `${process.env.REACT_APP_API_ENDPOINT}/admin/products?page=${productsPage}`
    );
    const [productDialog, setProductDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(dialogDefaultValue);
    const handleScroll = (e) => {
        if (tbodyRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = tbodyRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                let noOfPages = Math.ceil(products.total / 20);
                let newPage = page + 1;
                if (newPage <= noOfPages) {
                    setProductsPage(newPage);
                }
            }
        }
    };
    const handleEditProductDialog = (product) => {
        setSelectedProduct(product);
        setProductDialog(true);
    };
    const createProductHandler = () => {
        setSelectedProduct(dialogDefaultValue);
        setProductDialog(true);
    };
    const closeProductDialog = () => {
        setProductDialog(false);
    };
    const handleProduct = (product) => {
        let updatedProduct = {
            ...selectedProduct,
            ...product,
        };
        closeProductDialog();
        setProducts((prevState) => {
            let productsList = [...prevState.data];
            let isFound = productsList.findIndex(
                (item) => item._id === updatedProduct._id
            );
            if (isFound >= 0) {
                productsList[isFound] = updatedProduct;
            } else {
                productsList.unshift(updatedProduct);
            }

            return {
                total: prevState.total,
                data: productsList,
            };
        });
    };
    const confirmToggleDeleteProduct = (product) => {
        setSelectedProduct(product);
        setOpenConfirmDialog(true);
    };
    const softDeleteProduct = () => {
        callServer(
            'DELETE',
            `${process.env.REACT_APP_API_ENDPOINT}/admin/product/${selectedProduct._id}`
        )
            .then(() => {
                setOpenConfirmDialog(false);
                setProducts((prevState) => {
                    let productsList = [...prevState.data];
                    let isFound = productsList.findIndex(
                        (item) => item._id === selectedProduct._id
                    );
                    if (isFound >= 0) {
                        successNotification(
                            `Product was successfully ${
                                productsList[isFound].is_deleted
                                    ? 'restored'
                                    : 'deleted'
                            }`
                        );
                        productsList[
                            isFound
                        ].is_deleted = !selectedProduct.is_deleted;
                    }
                    return {
                        total: prevState.total,
                        data: productsList,
                    };
                });
            })
            .catch((err) => {
                if (err.response) {
                    errorNotification(
                        err.response.data.message,
                        'Delete product'
                    );
                }
            });
    };
    const closeConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };
    return (
        <div className={'adminProductsContainer'}>
            <ProductDialog
                close={closeProductDialog}
                open={productDialog}
                product={selectedProduct}
                onClosingDialog={handleProduct}
            />
            <ConfirmDialog
                open={openConfirmDialog}
                checkText={selectedProduct.is_deleted ? 'restore' : 'delete'}
                onClose={softDeleteProduct}
                close={closeConfirmDialog}
            />

            <div className={'bar'}>
                <p>Total: {products.total}</p>
                <ButtonUI
                    name={'create'}
                    width={'15rem'}
                    clickHandler={createProductHandler}
                />
            </div>
            <div className={'listWrapper'}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">image</th>
                            <th scope="col">name</th>
                            <th scope="col">quantity</th>
                            <th scope="col">sold</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody onScroll={handleScroll} ref={tbodyRef}>
                        {products && products.data.length
                            ? products.data.map((product, index) => {
                                  return (
                                      <tr key={product._id}>
                                          <th scope="row">{index + 1}</th>
                                          <td>
                                              <img
                                                  src={
                                                      product.images &&
                                                      product.images[0].url
                                                  }
                                                  alt={product.name}
                                              />
                                          </td>
                                          <td>{product.name}</td>
                                          <td>{product.quantity}</td>
                                          <td>{product.sold}</td>
                                          <td className={'controls'}>
                                              <EditIcon
                                                  className={'icon'}
                                                  fontSize={'large'}
                                                  onClick={() =>
                                                      handleEditProductDialog(
                                                          product
                                                      )
                                                  }
                                              />
                                              {product.is_deleted ? (
                                                  <SettingsBackupRestoreIcon
                                                      className={'icon'}
                                                      fontSize={'large'}
                                                      onClick={() =>
                                                          confirmToggleDeleteProduct(
                                                              product
                                                          )
                                                      }
                                                  />
                                              ) : (
                                                  <DeleteIcon
                                                      className={'icon'}
                                                      fontSize={'large'}
                                                      onClick={() =>
                                                          confirmToggleDeleteProduct(
                                                              product
                                                          )
                                                      }
                                                  />
                                              )}
                                          </td>
                                      </tr>
                                  );
                              })
                            : !productsLoading && (
                                  <tr
                                      style={{
                                          display: 'flex',
                                      }}
                                  >
                                      <td
                                          style={{
                                              display: 'flex',
                                              flexGrow: 1,
                                          }}
                                      >
                                          <DataPrompt
                                              message={
                                                  'No products were found.'
                                              }
                                          />
                                      </td>
                                  </tr>
                              )}
                        {productsLoading && (
                            <tr className={'loadingTr'}>
                                <td colSpan={6}>
                                    <CircularLoadingIndicator height={'5rem'} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
