import fs from 'fs';
import csv from 'csv-parser';

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
      // Find a matching row based on user input
      const matchedRow = data.find((row) => {
        return (
          row.Square_Meter == Square_Meter &&
          row.Age_of_house == Age_of_house &&
          row.Total_rooms == Total_rooms &&
          row.Total_Bath == Total_Bath &&
          row.Floor == Floor &&
          row.City == City
        );
      });
      if (!matchedRow) {
        return res.status(404).json({ error: 'Not Available Right Now' });
      }
      res.json({ Price: matchedRow.Price });
    });
};


