import axios from 'axios';
import * as cheerio from 'cheerio';
import tough from 'tough-cookie';
import { promisify } from 'util';

const CookieJar = tough.CookieJar;
const setCookie = promisify(CookieJar.prototype.setCookie.bind(new CookieJar()));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Create axios instance with cookie support
    const cookieJar = new CookieJar();
    const instance = axios.create({
      baseURL: 'https://tecdigital.tec.ac.cr',
      withCredentials: true,
      jar: cookieJar,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    });

    // Step 1: Login to TecDigital
    const loginResponse = await instance.post('/dotlrn/index', {
      email,
      password,
      return_url: '/dotlrn/index'
    });

    if (loginResponse.status !== 200) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Step 2: Fetch academic history page
    const promedioResponse = await instance.get('/dotlrn/academic-history');
    const $ = cheerio.load(promedioResponse.data);

    // Step 3: Extract average
    const promedioElement = $('td:contains("Promedio Ponderado")').next();
    const promedio = promedioElement.text().trim();

    if (!promedio) {
      return res.status(404).json({ error: 'Average not found' });
    }

    res.status(200).json({ promedio });
  } catch (error) {
    console.error('TecDigital error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch data from TecDigital',
      details: error.message
    });
  }
}