import React, {useState} from 'react';
import Modal from 'react-modal';
import { useAuth } from '../../context/auth_context';
import Spinner from '../animations/spinner/spinner';
import AnalyticsService from '../../api/services/analytics_service';
import './GaAccountSetupModal.css'

/**
 * Creates a modal that allows the user to select Google Analytics accounts and properties.
 * 
 * @returns - A modal that allows the user to select Google Analytics accounts and properties.
 */
const GaAccountSetupModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [accountData, setAccountData] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]); // Tracks selected accounts
    const [checkboxCount, setCheckboxCount] = useState(0); // Tracks number of selected checkboxes
    const analyticsService = new AnalyticsService();
    
    /**
     * Fetches user Google Analytics accounts and properties.
     * 
     * @returns - A list of Google Analytics accounts and properties.
     */
    const getAccountData = async() => {
        setIsOpen(true);
        const data = await analyticsService.getGaAccountsAndProperties();
        setAccountData(data.Accounts);
        console.log('Account data:', data);
    }

    /**
     * Saves the selected Google Analytics accounts and properties.
     * 
     * @returns - A message indicating the success or failure of the save operation.
     */
    const saveAccountData = async() => {
        try {
            if (selectedAccounts.length === 0) {
                console.log("No accounts or properties selected")
                return;
            }
            const response = await analyticsService.saveGaAccountsAndProperties(selectedAccounts);
            console.log('Reponse', response)
        } catch (err) {
            console.log('Error', err);
        }
    }

    /**
     * Handles the checkbox change event.
     * 
     * @param event - The checkbox change event.
     * @param account - The account object.
     * @param property - The property object.
     */
    // TODO: Limit the number of checkboxes selected depending on the users subscription-tier
    const handleCheckboxChange = (event, account, property) => {
        const isChecked = event.target.checked;
    
        // Update the checkbox count
        setCheckboxCount((prev) => (isChecked ? prev + 1 : Math.max(prev - 1, 0)));
    
        setSelectedAccounts((prevSelected) => {
            const updatedSelections = [...prevSelected];
            console.log('Selected accounts', updatedSelections)
            const existingAccount = updatedSelections.find((acc) => acc.ID === account.ID);
    
            if (isChecked) {
                if (!existingAccount) {
                    // Add new account with selected property
                    updatedSelections.push({
                        ID: account.ID,
                        Name: account.Name,
                        Kind: account.Kind,
                        Properties: [property],
                    });
                } else {
                    // Add property to the existing account
                    const propertyExists = existingAccount.Properties.some(
                        (prop) => prop.ID === property.ID
                    );
                    if (!propertyExists) {
                        existingAccount.Properties.push(property);
                    }
                }
            } else {
                if (existingAccount) {
                    // Remove property from the account
                    existingAccount.Properties = existingAccount.Properties.filter(
                        (prop) => prop.ID !== property.ID
                    );
    
                    // Remove the account if no properties remain
                    if (existingAccount.Properties.length === 0) {
                        return updatedSelections.filter((acc) => acc.ID !== account.ID);
                    }
                }
            }
            console.log('Updated selection', updatedSelections)
            console.log('serialized body', JSON.stringify(updatedSelections))
            return updatedSelections;
        });
    };
    

    return (
        <div>
            <button onClick={() => getAccountData()}>Setup Accounts</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                contentLabel="Configure your Accounts"
            >
                <h2>Configure your Accounts</h2>
                <div id="accounts-container">
                    {Array.isArray(accountData) && accountData.length > 0 ? (
                        accountData.map((account, index) => (
                            <div key={index} className="account">
                                <h3>{account.Name}</h3>
                                <p>{account.Kind}</p>
                                <div className="properties-container">
                                    {Array.isArray(account.Properties) && account.Properties.length > 0 ? (
                                        account.Properties.map((property, propertyIndex) => (
                                            <div key={propertyIndex}>
                                                <input
                                                    type="checkbox"
                                                    data-accountid={account.ID}
                                                    name={`account-${index}`}
                                                    value={property.ID}
                                                    onChange={(e) => handleCheckboxChange(e, account, property)}
                                                />
                                                <label>{property.Name} ({property.ID})</label>
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
                <button onClick={() => saveAccountData()}>Save</button>
                <button onClick={() => setIsOpen(false)}>Close</button>
            </Modal>

        </div>
    )
}



/*

let gaAccounts = []

let analyticAccount = []
TODO:
    - return GoogleAnalyticsAccount struct
        - has nested AnalyticAccounts
            - has GoogleProperty array
type GoogleAnalyticsAccounts struct {
	Accounts []AnalyticAccount
}

type AnalyticAccount struct {
	ID         string
	Kind       string
	Name       string
	Properties []*GoogleProperty
}
type GoogleProperty struct {
	ID   string
	Name string
}


*/
export default GaAccountSetupModal;