package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	status := 200
	message := ""
	id := request.QueryStringParameters["id"]

	if id != "" {
		message = fmt.Sprintf("Usuário %s encontrado!", id)
	} else {
		status = 400
		message = "Usuário não encontrado!"
	}

	return events.APIGatewayProxyResponse{
		StatusCode: status,
		Body:       message,
	}, nil
}

func main() {
	lambda.Start(handler)
}
