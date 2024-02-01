'use server';
import { JWT } from 'google-auth-library';
import creds from '../../../credentials.json'; // @todo into github secrets
import spreadsheet from '../../../spreadsheet.json'; // @todo into github secrets
import { GoogleSpreadsheet } from 'google-spreadsheet';

// navigate directly to this page via `/testing`
export default async function Page () {
  const jwt = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  const doc = new GoogleSpreadsheet(spreadsheet.id, jwt)
  await doc.loadInfo()

  const sheet = doc.sheetsByTitle['BOM']
  const rows = await sheet.getRows(0, 4)

  const headers = [];
  const data = [];

  rows.forEach((row, idx) => {
    const obj = row.toObject()

    Object.keys(obj).forEach((key) => {
      headers.push(key)

      if (! Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = [];
      }

      data[key].push(obj[key])

      // data.push({[key]: [obj[key]]})
    })
  })

  console.log(data)

  // await sheet.loadCells('A1:D1000')
  // console.log(sheet.getCell(1, 0).value)

  return (
    <table>
      <thead>
        <tr>
          {headers.map((name, idx) => (<th key={idx}>{name}</th>))}
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  )
}
