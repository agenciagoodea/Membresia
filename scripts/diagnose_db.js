
const url = 'https://wggjwoglmcmzulplcged.supabase.co/rest/v1/churches?select=id,name,slug';
const key = 'sb_publishable_H0Z5VavSF8xGiKNWcdFYWQ_qTULgdT5';

async function diagnose() {
	try {
		const response = await fetch(url, {
			headers: {
				'apikey': key,
				'Authorization': 'Bearer ' + key
			}
		});
		const churches = await response.json();
		console.log('CHURCHES_DATA:' + JSON.stringify(churches));

		const prayersResponse = await fetch('https://wggjwoglmcmzulplcged.supabase.co/rest/v1/prayers?select=id,church_id,status,name,request', {
			headers: {
				'apikey': key,
				'Authorization': 'Bearer ' + key
			}
		});
		const prayers = await prayersResponse.json();
		console.log('PRAYERS_DATA:' + JSON.stringify(prayers));
	} catch (error) {
		console.error('DIAGNOSE_ERROR:', error);
	}
}

diagnose();
