import React, { useState } from "react";
import Modal from "react-modal";
import { useAuth } from "../../context/auth_context";
import Spinner from "../animations/spinner/spinner";
import AnalyticsService from "../../api/services/analytics_service";
import "./GaAccountSetupModal.css";
import { GaAccount, GaProperty } from "../../api/dtos/analytics_dtos";

interface SelectedAccount extends GaAccount {
  Properties: GaProperty[];
}

/**
 * Creates a modal that allows the user to select Google Analytics accounts and properties.
 *
 * @returns - A modal that allows the user to select Google Analytics accounts and properties.
 */
const GaAccountSetupModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountData, setAccountData] = useState<GaAccount[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<SelectedAccount[]>(
    []
  ); // Tracks selected accounts
  const [checkboxCount, setCheckboxCount] = useState(0); // Tracks number of selected checkboxes
  const analyticsService = new AnalyticsService();

  /**
   * Fetches user Google Analytics accounts and properties.
   *
   * @returns - A list of Google Analytics accounts and properties.
   */
  const getAccountData = async () => {
    try {
      setIsOpen(true);
      const data = await analyticsService.getGaAccountsAndProperties();
      setAccountData(data.Accounts || []);
      console.log("Account data:", data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  /**
   * Saves the selected Google Analytics accounts and properties.
   *
   * @returns - A message indicating the success or failure of the save operation.
   */
  const saveAccountData = async () => {
    try {
      if (selectedAccounts.length === 0) {
        console.log("No accounts or properties selected");
        return;
      }
      const response = await analyticsService.saveGaAccountsAndProperties(
        selectedAccounts
      );
      console.log("Response:", response);
    } catch (err) {
      console.error("Error saving accounts:", err);
    }
  };

  /**
   * Handles the checkbox change event.
   *
   * @param event - The checkbox change event.
   * @param account - The account object.
   * @param property - The property object.
   */
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    account: GaAccount,
    property: GaProperty
  ) => {
    const isChecked = event.target.checked;

    // Update the checkbox count
    setCheckboxCount((prev) => (isChecked ? prev + 1 : Math.max(prev - 1, 0)));

    setSelectedAccounts((prevSelected) => {
      const updatedSelections = [...prevSelected];
      const existingAccount = updatedSelections.find(
        (acc) => acc.id === account.id
      );

      if (isChecked) {
        if (!existingAccount) {
          // Add new account with selected property
          updatedSelections.push({
            ...account,
            Properties: [property],
          });
        } else {
          // Add property to the existing account
          const propertyExists = existingAccount.Properties.some(
            (prop) => prop.id === property.id
          );
          if (!propertyExists) {
            existingAccount.Properties.push(property);
          }
        }
      } else {
        if (existingAccount) {
          // Remove property from the account
          existingAccount.Properties = existingAccount.Properties.filter(
            (prop) => prop.id !== property.id
          );

          // Remove the account if no properties remain
          if (existingAccount.Properties.length === 0) {
            return updatedSelections.filter((acc) => acc.id !== account.id);
          }
        }
      }
      return updatedSelections;
    });
  };

  return (
    <div>
      <button onClick={getAccountData}>Setup Accounts</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Configure your Accounts"
      >
        <h2>Configure your Accounts</h2>
        <div id="accounts-container">
          {Array.isArray(accountData) && accountData.length > 0 ? (
            accountData.map((account) => (
              <div key={account.id} className="account">
                <h3>{account.name}</h3>
                <p>{account.kind}</p>
                <div className="properties-container">
                  {Array.isArray(account.properties) &&
                  account.properties.length > 0 ? (
                    account.properties.map((property) => (
                      <div key={property.id}>
                        <input
                          type="checkbox"
                          data-accountid={account.id}
                          name={`account-${account.id}`}
                          value={property.id ?? ""}
                          onChange={(e) =>
                            handleCheckboxChange(e, account, property)
                          }
                        />
                        <label>
                          {property.name} ({property.id})
                        </label>
                      </div>
                    ))
                  ) : (
                    <p>No properties available</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No accounts available</p>
          )}
        </div>
        <button onClick={saveAccountData}>Save</button>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default GaAccountSetupModal;
