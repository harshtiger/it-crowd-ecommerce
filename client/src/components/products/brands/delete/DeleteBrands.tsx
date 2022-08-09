import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { useLocalStorage } from "../../../../helpers/useLocalStorage";
import { deleteBrand, getBrands } from "../../../../redux/actions/brands";
import { Brand } from "../../../../redux/interface";
import { State } from "../../../../redux/reducers";
import { FormContainer } from "../../../form/FormCreateStyles";

export interface BRANDS {
  id: number;
  BrandID: number;
}

export interface singleBrands {
  id: number;
  name: string;
}

export default function DeleteBrands(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allBrands = useSelector((state: State) => state.brands.brands);
  const allProducts = useSelector((state: State) => state.products.products);
  const [userInStorage, setUserInStorage] = useLocalStorage("USER_LOGGED", "");
  const [brands, setBrands] = useState<BRANDS>({
    id: 0,
    BrandID: 0,
  });

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  let singleBrands: any = [];

  let prod = allProducts.map(e => e.BrandId);
  let brands2 = allBrands.map(e => e);

  for (let i in brands2) {
    if (!prod.includes(brands2[i].id)) {
      singleBrands.push(brands2[i]);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setBrands({
      ...brands,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (brands.id != 0) {
      dispatch(deleteBrand(String(brands.id), userInStorage.token));
      swal({
        title: "Deleted brand",
        icon: "success",
      });
      setTimeout(() => {
        navigate("/productsAdminMode");
      }, 1000);
    } else {
      swal({
        title: "Brand not selected",
        icon: "error",
      });
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <h3>Delete brand</h3>
        {console.log(singleBrands, "on the select")}
        <div className="form-group flex-fill ms-2">
          <label className="form-label mt-4">Existing Brands</label>

          <select
            onChange={e => handleChange(e)}
            className="form-select"
            id="id"
            name="id"
          >
            <option hidden>Select brand</option>
            {singleBrands.length > 0 ? (
              singleBrands.map((e: singleBrands) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })
            ) : (
              <option> There are no Brands with no products connected </option>
            )}
          </select>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-outline-primary mt-5">
            Submit
          </button>
        </div>
      </form>
    </FormContainer>
  );
}
