import React, { useRef, useState } from 'react';
import ButtonUI from '../../../components/UI/ButtonUI/ButtonUI';
import DataPrompt from '../../../components/DataPrompt/DataPrompt';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useLocation } from 'react-router-dom';
import useFetchAdminProducts from '../../../hooks/useFetchAdminProducts';
import CircularLoadingIndicator from '../../../components/LoadingIndicator/CircularLoadingIndicator';

const queryString = require('query-string');
const AdminProducts = () => {
    const location = useLocation();
    const tbodyRef = useRef();
    let { page = 1 } = queryString.parse(location.search);
    const [productsPage, setProductsPage] = useState(page);
    let [productsLoading, products] = useFetchAdminProducts(
        `${process.env.REACT_APP_API_ENDPOINT}/admin/products?page=${productsPage}`
    );
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
    return (
        <div className={'adminProductsContainer'}>
            <div className={'adminProductsContainer__CreateButtonWrapper'}>
                <ButtonUI name={'create'} width={'15rem'} />
            </div>
            <div className={'adminProductsContainer__productsListWrapper'}>
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
                        {products && products.products.length
                            ? products.products.map((product, index) => {
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
                                              <EditIcon fontSize={'large'} />
                                              <DeleteIcon fontSize={'large'} />
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
