const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env'));

const supabase = createClient(envConfig.VITE_SUPABASE_URL, envConfig.VITE_SUPABASE_ANON_KEY);

async function testConnection() {
	console.log("Testing connection to", envConfig.VITE_SUPABASE_URL);
	const { data, error } = await supabase.from('churches').select('*').limit(1);
	if (error) {
		console.error("Connection failed:", error);
	} else {
		console.log("Connection successful! Data:", data);
	}
}

testConnection();
