import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import swal from 'sweetalert'
import { useLocalStorage } from '../../../helpers/useLocalStorage';
import {  getBrands, createBrands } from '../../../redux/actions/brands';
import { Brand } from '../../../redux/interface';
import { State } from '../../../redux/reducers';
import { FormContainer } from '../../form/FormCreateStyles';

interface FORM_BRAND {
    name: string,
    logo_url: string,
    id: number
}

export interface FORM_SUB {
    name: string,
    CategoryId: any
}


export default function CreateCategories(): JSX.Element {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [userInStorage, setUserInStorage] = useLocalStorage('USER_LOGGED', '')
    const [newBrand, setNewBrand] = useState<FORM_BRAND>({
        name: "",
        logo_url: "",
        id: 999
    })
  
    useEffect(() => {
        dispatch(getBrands())

    }, [])

    // const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    //     e.preventDefault()
    //     setNewBrand({
    //         ...newBrand,
    //         name: e.target.value,
    //         logo_url: e.target.value
    //     })

    // }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()

        setNewBrand({
            ...newBrand,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newBrand.name !== "") {
           dispatch(createBrands(newBrand, userInStorage.token))

            swal({
                title: "Create successfully",
                icon: "success",
                buttons: {
                    confirm: true,
                },
            })
            setTimeout(() => {
                navigate('/productsAdminMode')
            }, 1000)
        } else {
            swal({
                title: "Form needs all fields",
                icon: "error"
            })
        }
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center mt-5 pt-2">Create Brand</h3>
                <div className='d-flex'>
                    <div className="form-group flex-fill ms-2">
                        <label htmlFor="staticEmail" className=" form-label mt-4">
                            New Brand
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            name="name"
                            value={newBrand.name}
                            placeholder="Enter brand"
                            onChange={(e) => handleChangeInput(e)}
                        />

<input
                            type="text"
                            className="form-control"
                            id="staticEmail2"
                            name="logo_url"
                            value={newBrand.logo_url}
                            placeholder="Enter logo URL"
                            onChange={(e) => handleChangeInput(e)}
                        />
                    </div>

                   
                </div>

                <div className="text-center">
                    <button type='submit' className="btn btn-outline-primary mt-5">Submit</button>
                </div>
            </form>
        </FormContainer>
    )
}
