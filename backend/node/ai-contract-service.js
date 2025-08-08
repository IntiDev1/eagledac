// backend/node/ai-contract-service.js
import axios from 'axios';

const ALITH_API_URL = "https://api.alith.metis.io";
const API_KEY = "TU_API_KEY";

export class ContractGenerator {
    async generateContract(prompt) {
        const response = await axios.post(`${ALITH_API_URL}/generate`, {
            prompt,
            framework: "foundry",
            language: "solidity"
        }, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        });
        return response.data.code;
    }
}