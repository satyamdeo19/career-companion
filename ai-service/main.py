import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS
import sklearn

app = Flask(__name__)
CORS(app)

# --- Load Model ---
try:
    with open('models/career_model.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ ERROR loading model: {e}")
    model = None

# --- FIX: Create mapping dictionaries for text-based answers ---
# These dictionaries convert the string from the frontend to a number for the model.
# The numeric values (0, 1, 2...) should match the encoding used when you trained the model.
CERTIFICATION_MAP = {
    "R Programming": 0, "Information Security": 1, "Shell Programming": 2,
    "Machine Learning": 3, "Full Stack": 4, "Hadoop": 5, "Python": 6,
    "Distro Making": 7, "App Development": 8
}

WORKSHOP_MAP = {
    "Database Security": 0, "System Designing": 1, "Web Technologies": 2,
    "Hacking": 3, "Testing": 4, "Data Science": 5, "Game Development": 6,
    "Cloud Computing": 7
}

# --- Prediction Endpoint ---
@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model is not loaded'}), 500

    try:
        data = request.get_json()

        # --- FIX: Use the mapping dictionaries to convert all answers to numbers ---
        feature_vector = [
            int(data['question1']),
            int(data['question2']),
            int(data['question3']),
            int(data['question4']),
            int(data['question5']),
            int(data['question6']),
            CERTIFICATION_MAP[data['question7']],  # Convert using the map
            WORKSHOP_MAP[data['question8']],      # Convert using the map
            int(data['question9']),
            int(data['question10']),
            int(data['question11']),
            int(data['question12']),
            int(data['question13']),
            int(data['question14']),
            int(data['question15']),
            int(data['question16']),
            int(data['question17']),
            int(data['question18']),
            int(data['question19'])
        ]

        # Make prediction and get probabilities
        prediction = model.predict([feature_vector])
        probability_scores = model.predict_proba([feature_vector])

        # Find the probability of the predicted class
        predicted_class_index = list(model.classes_).index(prediction[0])
        probability = probability_scores[0][predicted_class_index]

        return jsonify({
            'prediction': prediction[0],
            'probability': float(probability)
        })

    except KeyError as e:
        # This will happen if the frontend sends a text value not in our maps
        return jsonify({'error': f'Invalid categorical value received: {e}. Please check the answer format.'}), 400
    except ValueError:
        # This will happen if a numeric field is sent as non-numeric text
        return jsonify({'error': 'Invalid data type. One of the answers that should be a number is not.'}), 400
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)

