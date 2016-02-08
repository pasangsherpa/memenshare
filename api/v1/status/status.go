package status

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/pasangsherpa/memenshare/api/v1"
)

func RealMain(routerGroup *gin.RouterGroup) {
	routerGroup.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
}

func init() {
	v1.RegisterGroup(RealMain)
}
