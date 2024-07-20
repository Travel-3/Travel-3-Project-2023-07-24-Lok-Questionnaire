export const config = {
  runtime: "edge",
};

export default async function handler() {
  try {
    const response = await fetch(
      "https://graph.facebook.com/v18.0/291627538128168_887383386728188/comments?access_token=EAAJAvGPzlu0BO4SiuQ5ykzmOFpL6s3jULLpNXA29vRMVMAh1r4fMVM2ETDf4ud0il9QyZCZBdKPZCZCUSlDtTNwQDtCSb9YExfSAcRw8mYTcocrW33zDCVAWWZBZCesklUzuqfAgvOFHunyUVy4ddYPHc5IdDd86w8JoOpg9pJJaZBZCPZCaE4UCyOwZCrhuzer009NVWagNyqbWzppyvfYjQAGTQB",
    );

    const result = await response.json();

    console.log(result);
  } catch (error) {}
}
