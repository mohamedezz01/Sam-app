import fs from 'fs'
import csv from 'csv-parser'
export const RentPredictionPrice = async (req, res, next) => {
  const { Square_Meter, Age_of_house, Total_rooms, Total_Bath, Floor, City } = req.body;
  const data = [];

  // Read CSV data
  fs.createReadStream('forRent.csv')
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      console.log('CSV data loaded successfully');
      // Filter data by city
      const filteredData = data.filter((row) => row.City === City);

      // Find a matching row based on user input
      const matchedRow = filteredData.find((row) => {
        return (
          row.Square_Meter == Square_Meter &&
          row.Age_of_house == Age_of_house &&
          row.Total_rooms == Total_rooms &&
          row.Total_Bath == Total_Bath &&
          row.Floor == Floor
        )
      })

      if (!matchedRow) {
        // If no exact match, find the closest match based on size, number of rooms, number of baths, and floor
        const closestMatch = filteredData.reduce((acc, curr) => {
          const accDiff = Math.abs(acc.Square_Meter - Square_Meter) + Math.abs(acc.Total_rooms - Total_rooms) + Math.abs(acc.Total_Bath - Total_Bath) + Math.abs(acc.Floor - Floor);
          const currDiff = Math.abs(curr.Square_Meter - Square_Meter) + Math.abs(curr.Total_rooms - Total_rooms) + Math.abs(curr.Total_Bath - Total_Bath) + Math.abs(curr.Floor - Floor);
          return accDiff < currDiff ? acc : curr;
        });

        if (closestMatch === matchedRow) {
          res.json({ Price: matchedRow.Price });
        } else {
          res.json({
            Price: closestMatch.Price,
            NearestMatch: closestMatch
          });
        }
      } else {
        res.json({ Price: matchedRow.Price });
      }})
}
