import React from "react";

import { AdminUsersContainer, ListContainer } from "./AdminModeUsersStyles";

const AdminUserMode = (): JSX.Element => {
  return (
    <AdminUsersContainer>
      <ListContainer>
        <h3>User Controller</h3>
        <div className="mt-4">
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">IsActive</th>
                <th scope="col">Password Reset </th>
              </tr>
            </thead>
          </table>

          <div>Under construction</div>
        </div>
      </ListContainer>
    </AdminUsersContainer>
  );
};

export default AdminUserMode;
