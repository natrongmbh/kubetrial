package util

import (
	"errors"
	"os"
)

var (
	err  error
	CORS string
)

// LoadEnv loads OS environment variables
func LoadEnv() error {
	// Load environment variables
	if CORS = os.Getenv("CORS"); CORS == "" {
		InfoLogger.Println("CORS not set, defaulting to '*'")
		CORS = "*"
	}

	if JWT_SECRET_KEY = os.Getenv("JWT_SECRET_KEY"); JWT_SECRET_KEY == "" {
		JWT_SECRET_KEY = RandomStringBytes(32)
		InfoLogger.Println("JWT_SECRET_KEY not set, defaulting to random string of length 32: " + JWT_SECRET_KEY)
	}

	if GITHUB_CALLBACK_URL = os.Getenv("GITHUB_CALLBACK_URL"); GITHUB_CALLBACK_URL == "" {
		WarningLogger.Println("GITHUB_CALLBACK_URL not set")
		GITHUB_CALLBACK_URL = "http://localhost:8000/auth/github/callback"
	}

	if GITHUB_CLIENT_ID = os.Getenv("GITHUB_CLIENT_ID"); GITHUB_CLIENT_ID == "" {
		return errors.New("GITHUB_CLIENT_ID not set")
	}

	if GITHUB_CLIENT_SECRET = os.Getenv("GITHUB_CLIENT_SECRET"); GITHUB_CLIENT_SECRET == "" {
		return errors.New("GITHUB_CLIENT_SECRET not set")
	}

	if GITHUB_ORGANIZATION = os.Getenv("GITHUB_ORGANIZATION"); GITHUB_ORGANIZATION == "" {
		return errors.New("GITHUB_ORGANIZATION not set")
	}

	return nil
}
