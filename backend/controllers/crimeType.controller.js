const crimeTypes = [
  "Theft",
  "Assault",
  "Burglary",
  "Vandalism",
  "Fraud",
  "Drug Offense",
  "Homicide",
  "Cybercrime",
  "Domestic Violence",
  "Other",
];

export const getCrimeTypes = (req, res) => {
  res.json(crimeTypes);
};
